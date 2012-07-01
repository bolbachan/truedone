
class AjaxController < ApplicationController
  def project

  end

  def test
    data = { :runs => 5, :metrics => 2}

    response.headers['Content-type'] = "text/plain; charset=utf-8"
    render :text => data.to_json
  end
end
