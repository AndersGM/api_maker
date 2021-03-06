class ApiMaker::PermittedParamsArgument
  attr_reader :command, :model

  def initialize(command:, model:)
    @command = command
    @model = model
  end

  def inspect
    "#<#{self.class.name}:#{__id__}>"
  end

  def params
    @params ||= command.args&.dig(:save) || {}
  end
end
