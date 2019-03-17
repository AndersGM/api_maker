class ApiMaker::Serializer
  attr_reader :ability, :args, :model, :relationships

  def self.resource_for(klass)
    "Resources::#{klass.name}Resource".constantize
  rescue NameError
    nil
  end

  def self.resource_for!(klass)
    ApiMaker::MemoryStorage.current.resource_for_model(klass)
  end

  def initialize(ability: nil, args: {}, model:)
    @args = args
    @model = model
    @ability = ability
    @relationships = {}
  end

  def attributes
    result = {}
    resource._attributes.each do |attribute, data|
      if data.dig(:args, :if).present?
        condition_result = attribute_value(data.fetch(:args).fetch(:if))
        next unless condition_result
      end

      result[attribute] = attribute_converted_value(attribute)
    end

    result
  end

  def attribute_converted_value(attribute)
    value = attribute_value(attribute)

    if value.is_a?(Date)
      value.iso8601
    elsif value.is_a?(Time)
      value.utc.iso8601
    elsif value.class.name == "Money"
      {
        amount: value.cents,
        currency: value.currency.iso_code,
        type: :money
      }
    else
      value
    end
  end

  def attribute_value(attribute)
    if resource_instance.respond_to?(attribute)
      resource_instance.__send__(attribute)
    else
      model.__send__(attribute)
    end
  end

  def fetch(*args, &blk)
    result.fetch(*args, &blk)
  end

  def resource
    @resource ||= ApiMaker::Serializer.resource_for!(model.class)
  end

  def resource_instance
    @resource_instance ||= resource.new(ability: ability, args: args, model: model)
  end

  def result
    @result ||= {
      type: model.class.model_name.plural,
      id: model.id,
      attributes: attributes,
      relationships: relationships
    }
  end

  def as_json(_options = nil)
    result
  end

  def to_json(_options = nil)
    JSON.generate(as_json)
  end

  def inspect
    "<ApiMaker::Serializer model=\"#{model.class.name}\" id=\"#{model.id}\">"
  end

  alias to_s inspect
end
