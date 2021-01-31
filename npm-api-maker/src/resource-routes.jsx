import React from "react"
import ResourceRoute from "./resource-route"
import {Route} from "react-router-dom"

const {digg} = require("@kaspernj/object-digger")

export default class ApiMakerResourceRoutes {
  static readRoutes({jsRoutes, locales, requireComponent, routeDefinitions}) {
    if (!routeDefinitions)
      throw new Error("Please pass 'routeDefinitions' to this method")

    const routes = []

    for(const routeDefinition of routeDefinitions.routes) {
      const resourceRoute = new ResourceRoute({jsRoutes, locales, requireComponent, routeDefinition})

      for(const newRoute of resourceRoute.routesResult()) {
        routes.push(
          <Route exact key={`route-${digg(newRoute, "path")}`} path={digg(newRoute, "path")} component={digg(newRoute, "component")} />
        )
      }
    }

    return routes
  }
}
