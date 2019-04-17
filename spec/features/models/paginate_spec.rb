require "rails_helper"

describe "api maker paginate", :js do
  let(:user) { create :user }

  before do
    80.times do
      create(:task, user: user)
    end
  end

  it "changes page successfully" do
    login_as user, scope: :user

    visit models_paginate_path

    wait_for_selector ".component-models-paginate .content-container"

    expect(page).to have_selector "a[href='/models/paginate?tasks_page=1']"
    expect(page).to have_selector "a[href='/models/paginate?tasks_page=2']"
    expect(page).to have_selector "a[href='/models/paginate?tasks_page=3']"
    expect(page).to_not have_selector "a[href='/models/paginate?tasks_page=4']"

    find("a[href='/models/paginate?tasks_page=2']", match: :first).click

    wait_for_selector ".task-row[data-task-id='45']"

    expect(current_url).to end_with "/models/paginate?tasks_page=2"
  end
end
