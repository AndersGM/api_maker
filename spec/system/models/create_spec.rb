require "rails_helper"

describe "model create" do
  let(:user) { create :user }

  it "creates a model" do
    login_as user

    visit models_create_path

    wait_for_path models_create_path

    wait_for_browser { find("[data-controller='models--create']", visible: false)["data-create-completed"] == "true" }
    wait_for_browser { Project.count > 0 }

    created_project = Project.last
    element = find("[data-controller='models--create']", visible: false)

    expect(created_project.name).to eq "test-create-project"
    expect(element["data-project-name"]).to eq "test-create-project"
  end

  it "prevents saving when no access (not signed in)" do
    visit models_create_path

    visit_action = proc do
      wait_for_path models_create_path
      wait_for_browser { find("[data-controller='models--create']", visible: false)["data-create-completed"] == "true" }
    end

    expect { visit_action.call }.to raise_error(RuntimeError, "UnhandledRejection: Command failed: No access to create that resource")
  end
end
