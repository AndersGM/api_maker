const {digg} = require("@kaspernj/object-digger")
const inflection = require("inflection")
const Services = require("./services.cjs")

module.exports = class ApiMakerCanCan {
  static current() {
    if (!window.currentApiMakerCanCan) {
      window.currentApiMakerCanCan = new ApiMakerCanCan()
    }

    return window.currentApiMakerCanCan
  }

  constructor() {
    this.abilities = []
    this.abilitiesToLoad = []
    this.abilitiesToLoadData = []
  }

  can(ability, subject) {
    ability = inflection.underscore(ability)
    const foundAbility = this.findAbility(ability, subject)

    if (foundAbility === undefined) {
      let subjectLabel = subject

      // Translate resource-models into class name strings
      if (typeof subject == "function" && subject["modelClassData"]) {
        subjectLabel = digg(subject.modelClassData(), "name")
      }

      console.error(`Ability not loaded ${subjectLabel}#${ability}`)

      return false
    } else {
      return digg(foundAbility, "can")
    }
  }

  findAbility(ability, subject) {
    return this.abilities.find((abilityData) => digg(abilityData, "subject") == subject && digg(abilityData, "ability") == ability)
  }

  isAbilityLoaded(ability, subject) {
    const foundAbility = this.findAbility(ability, subject)

    if (foundAbility !== undefined) {
      return true
    }

    return false
  }

  async loadAbilities(abilities) {
    return new Promise((resolve) => {
      const promises = []

      for (const abilityData of abilities) {
        const subject = abilityData[0]

        for (const ability of abilityData[1]) {
          const promise = this.loadAbility(ability, subject)

          promises.push(promise)
        }
      }

      Promise.all(promises).then(() => resolve())
    })
  }

  async loadAbility(ability, subject) {
    return new Promise((resolve) => {
      ability = inflection.underscore(ability)

      if (this.isAbilityLoaded(ability, subject)) {
        return resolve()
      }

      const includes = this.abilitiesToLoad.find((abilityToLoad) => digg(abilityToLoad, "ability") == ability && digg(abilityToLoad, "subject") == subject)

      if (!includes) {
        this.abilitiesToLoad.push({ability, callback: resolve, subject})
        this.abilitiesToLoadData.push({ability, subject})
      }

      this.queueAbilitiesRequest()
    })
  }

  queueAbilitiesRequest() {
    if (this.queueAbilitiesRequestTimeout) {
      clearTimeout(this.queueAbilitiesRequestTimeout)
    }

    this.queueAbilitiesRequestTimeout = setTimeout(() => this.sendAbilitiesRequest(), 0)
  }

  resetAbilities() {
    this.abilities = []
  }

  async sendAbilitiesRequest() {
    const abilitiesToLoad = this.abilitiesToLoad
    const abilitiesToLoadData = this.abilitiesToLoadData

    this.abilitiesToLoad = []
    this.abilitiesToLoadData = []

    // Load abilities from backend
    const result = await Services.current().sendRequest("CanCan::LoadAbilities", {
      request: abilitiesToLoadData
    })
    const abilities = digg(result, "abilities")

    // Set the loaded abilities
    this.abilities = this.abilities.concat(abilities)

    // Call the callbacks that are waiting for the ability to have been loaded
    for (const abilityData of abilitiesToLoad) {
      abilityData.callback()
    }
  }
}