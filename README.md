# This branch should be PlugNPlay for running in Azure. 
Clone this repository into your own Azure DevOps account. Set up the pipeline from the azure-pipeline.yml file.

# AWS SAM CLI E2E Testing

Repository for running the SAM CLI on Azure with E2E tests.

# Tool you will need to run locally
- SAM CLI
- Docker
- npm

# Mono repo for your convenience!
You will find the backend and frontend code in this repository. 

To get started run the script `startE2E.sh`. 

This script will run SAM CLI on your machine along with docker-compose. 

# Pipeline

For those of you that are savy with environment variables, this environment variable will need to updated and the code changed accordingly:

REACT_APP_FEEDBACK_API=http://172.17.0.1:3001/feedback
