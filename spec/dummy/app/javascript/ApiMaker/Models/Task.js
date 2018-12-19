import BaseModel from "../BaseModel"
import Collection from "../Collection"

export default class Task extends BaseModel {
  static modelClassData() {
    return {"attributes":[{"name":"created_at","type":"datetime"},{"name":"id","type":"integer"},{"name":"name","type":"string"},{"name":"project_id","type":"integer"},{"name":"user_id","type":"integer"},{"name":"custom_id","type":"unknown"}],"name":"Task","pluralName":"tasks","relationships":[{"className":"Project","name":"project","macro":"belongs_to"},{"className":"User","name":"user","macro":"belongs_to"}],"paramKey":"task","path":"/api_maker/tasks","primaryKey":"id"}
  }

  
    
      loadProject() {
        let id = this.projectId()
        let modelClass = require(`ApiMaker/Models/Project`).default
        return this._loadBelongsToReflection({"reflectionName":"project","model":this,"modelClass":modelClass,"ransack":{"id_eq":id}})
      }

      project() {
        let id = this.projectId()
        let modelClass = require(`ApiMaker/Models/Project`).default
        return this._readBelongsToReflection({"reflectionName":"project","model":this,"modelClass":modelClass})
      }
    
  
    
      loadUser() {
        let id = this.userId()
        let modelClass = require(`ApiMaker/Models/User`).default
        return this._loadBelongsToReflection({"reflectionName":"user","model":this,"modelClass":modelClass,"ransack":{"id_eq":id}})
      }

      user() {
        let id = this.userId()
        let modelClass = require(`ApiMaker/Models/User`).default
        return this._readBelongsToReflection({"reflectionName":"user","model":this,"modelClass":modelClass})
      }
    
  

  
    
    createdAt() {
      // datetime
      
        return this._getAttributeDateTime("created_at")
      
    }

    hasCreatedAt() {
      let value = this.createdAt()
      return this._isPresent(value)
    }
  
    
    id() {
      // integer
      
        return this._getAttribute("id")
      
    }

    hasId() {
      let value = this.id()
      return this._isPresent(value)
    }
  
    
    name() {
      // string
      
        return this._getAttribute("name")
      
    }

    hasName() {
      let value = this.name()
      return this._isPresent(value)
    }
  
    
    projectId() {
      // integer
      
        return this._getAttribute("project_id")
      
    }

    hasProjectId() {
      let value = this.projectId()
      return this._isPresent(value)
    }
  
    
    userId() {
      // integer
      
        return this._getAttribute("user_id")
      
    }

    hasUserId() {
      let value = this.userId()
      return this._isPresent(value)
    }
  
    
    customId() {
      // unknown
      
        return this._getAttribute("custom_id")
      
    }

    hasCustomId() {
      let value = this.customId()
      return this._isPresent(value)
    }
  

  
    static testCollection(args) {
      return this._callcollectionCommand({
        args: args,
        collectionCommand: "test_collection",
        modelClass: this
      })
    }
  

  
    testMember(args) {
      return this._callmemberCommand({
        args: args,
        memberCommand: "test_member",
        model: this
      })
    }
  
}
