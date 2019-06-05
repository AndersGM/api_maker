module ApiMaker::ModelExtensions
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def api_maker_broadcast_updates
      after_commit on: :update do |model|
        channel_name = "api_maker_updates_#{model.class.name}_#{model.id}"
        serializer = ApiMaker::Serializer.new(model: model)
        data_to_broadcast = ApiMaker::ResultParser.parse(
          model: model,
          model_id: model.id,
          model_type: serializer.resource.collection_name,
          type: :update
        )

        ActionCable.server.broadcast(channel_name, data_to_broadcast)
      end

      after_commit on: :destroy do |model|
        channel_name = "api_maker_destroys_#{model.class.name}_#{model.id}"
        serializer = ApiMaker::Serializer.new(model: model)
        data_to_broadcast = ApiMaker::ResultParser.parse(
          model: model,
          model_id: model.id,
          model_type: serializer.resource.collection_name,
          type: :destroy
        )

        ActionCable.server.broadcast(channel_name, data_to_broadcast)
      end
    end
  end

  def api_maker_event(event_name, args = {})
    channel_name = "api_maker_events_#{self.class.name}_#{id}_#{event_name}"
    serializer = ApiMaker::Serializer.new(model: self)
    data_to_broadcast = ApiMaker::ResultParser.parse(
      args: args,
      event_name: event_name,
      model: model,
      model_id: id,
      model_type: serializer.resource.collection_name,
      type: :event
    )

    ActionCable.server.broadcast(channel_name, data_to_broadcast)
  end
end
