require "rails_helper"

describe "model preload" do
  let!(:task) { create :task, name: "test-task", project: project }
  let!(:project) { create :project, name: "test-project" }

  it "finds the model", :js do
    visit models_preload_path(task_id: task.id)

    expect(current_path).to eq models_preload_path

    wait_for_chrome { find("[data-controller='models--preload']", visible: false)["data-preload-completed"] == "true" }

    task_with_preload = JSON.parse(find("[data-controller='models--preload']", visible: false)["data-task-with-preload"])
    task_without_preload = JSON.parse(find("[data-controller='models--preload']", visible: false)["data-task-without-preload"])

    expect(task_with_preload.fetch("modelData")).to_not have_key "project"
    expect(task_with_preload.dig("relationshipsCache", "project", "modelData", "name")).to eq "test-project"
    expect(task_without_preload.fetch("modelData")).to_not have_key "project"
  end
end
