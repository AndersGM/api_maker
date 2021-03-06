class ApiMaker::CreateCommand < ApiMaker::BaseCommand
  attr_reader :model, :serializer

  def execute!
    @model = collection.klass.new
    @serializer = serialized_resource(model)
    sanitized_parameters = sanitize_parameters
    @model.assign_attributes(sanitized_parameters)

    if !current_ability.can?(:create, model)
      failure_response(errors: ["No access to create that resource"])
    elsif model.save
      success_response
    else
      failure_save_response(model: model, params: sanitized_parameters)
    end
  end

  def api_maker_resource_class
    @api_maker_resource_class ||= "Resources::#{collection.klass.name}Resource".constantize
  end

  def resource_instance_class_name
    @resource_instance_class_name ||= self.class.name.split("::").last.gsub(/Controller$/, "").singularize
  end

  def resource_instance_class
    @resource_instance_class ||= api_maker_resource_class.model_class
  end

  def resource_variable_name
    @resource_variable_name ||= resource_instance_class_name.underscore.parameterize
  end

  def sanitize_parameters
    serializer.resource_instance.permitted_params(ApiMaker::PermittedParamsArgument.new(command: self, model: model))
  end

  def success_response
    succeed!(
      model: serialized_model(model),
      success: true
    )
  end
end
