# ApiMaker

Generates a Rails API endpoints, JavaScript API files for Webpack and more by inspecting your models and serializers.

## Installation
Add this line to your application's Gemfile:

```ruby
gem "api_maker"
```

ApiMaker makes use of CanCanCan to keep track of, what models a given user should have access to. Make a file where you define access in `app/models/api_maker_ability.rb` containing something like this:
```ruby
class ApiMakerAbility
  include CanCan::Ability

  def initialize(controller:)
    user = controller.current_user
    
    if user
      can :manage, Project, user_id: user.id
      can :manage, Task, project: {user_id: user.id}
      can :manage, User, id: user.id
    end
  end
end
```

ApiMaker will only create models and endpoints for ActiveRecord models that has serializers. So be sure to add ActiveModelSerializers for your models first.

ApiMaker uses that to keep track of, what data and relationships you want exposed through the API.

Its now time to generate models and controllers like this:
```bash
rake api_maker:generate_models
```

If you want to be able to create and update models, then you should go into each generated controller and create a params method to define, which attributes can be written on each model like this:
```ruby
class ApiMaker::ProjectsController < ApiMaker::ModelController
private

  def project_params
    params.require(:project).permit(:name)
  end
end
```

## Usage

### Creating a new model from JavaScript

```js
import Task from "ApiMaker/Models/Task"

var task = new Task()
task.assignAttributes({name: "New task"})
task.create().then((status) => {
  if (status.success) {
    console.log("Task was created")
  } else {
    console.log("Task wasnt created")
  }
})
```

### Finding an existing model

```js
Task.find(5).then((task) => {
  console.log("Task found: " + task.name())
})
```

### Updating a model

```js
task.assignAttributes({name: "New name"})
task.save().then((status) => {
  if (status.success) {
    console.log("Task was updated")
  } else {
    console.log("Task wasnt updated")
  }
})
```

```js
task.update({name: "New name"}).then((status) => {
  if (status.success) {
    console.log("Task was updated")
  } else {
    console.log("Task wasnt updated")
  }
})
```

### Deleting a model

```js
task.destroy().then((status) => {
  if (status.success) {
    console.log("Task was destroyed")
  } else {
    console.log("Task wasnt destroyed")
  }
})
```

### Query models

ApiModels uses [Ransack](https://github.com/activerecord-hackery/ransack) to expose a huge amount of options to query data.

```js
Task.ransack({name_cont: "something"}).then((tasks) => {
  console.log("Found: " + tasks.length + " tasks")
})
```

## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
