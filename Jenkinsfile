pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('Git Pull') {
      steps {
        sh '''export PATH=/sbin:/usr/sbin:/usr/bin:/usr/local/bin


'''
        sh 'npm install'
        sh 'ls'
      }
    }

  }
}