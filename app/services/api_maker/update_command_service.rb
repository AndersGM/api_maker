class ApiMaker::UpdateCommandService < ApiMaker::CommandService
  def execute
    ApiMaker::UpdateCommand.execute_in_thread!(
      ability: ability,
      args: args,
      collection: collection,
      commands: commands,
      command_response: command_response,
      controller: controller
    )
    ServicePattern::Response.new(success: true)
  end

  def collection
    @collection ||= model_class.accessible_by(@ability, :update).where(model_class.primary_key => ids)
  end

  def ids
    @commands.values.map { |command| command.fetch("primary_key") }
  end
end
