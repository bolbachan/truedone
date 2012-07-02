class AjaxController < ApplicationController
  def test

    user = User.where(:name => "Igor")




    response.headers['Content-type'] = "text/plain; charset=utf-8"
    render :text => user.to_json
  end
end
