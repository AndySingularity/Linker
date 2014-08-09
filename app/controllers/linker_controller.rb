class LinkerController < ApplicationController
    
  def index
  end
  
  def show_params
  end
  
  def download
    send_file('/home/ubuntu/workspace/Gemfile')
  end
    
end