require "rails_helper"

describe "member command" do
  let(:task) { create :task }

  it "calls the correct command and responds", :js do
    visit commands_member_command_path(task_id: task.id)

    expect(current_path).to eq commands_member_command_path

    WaitUtil.wait_for_condition("command to be called") { find("[data-controller='commands--member']", visible: false)["data-test-member-response"].present? }

    response = JSON.parse(find("[data-controller='commands--member']", visible: false)["data-test-member-response"])

    expect(response.fetch("test_member_command_called")).to eq true
  end
end