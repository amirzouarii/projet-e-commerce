// Jenkinsfile (Declarative Pipeline)
// - Build images (backend + frontend)
// - Scan images using Trivy (via Docker image)
// - Push images to Docker Hub if scans are clean

pipeline {
  agent any
  options { timestamps() }

  parameters {
    string(name: 'DOCKER_REPO', defaultValue: 'your-dockerhub-username/projet-e-commerce', description: 'Docker Hub repo (username/repo)')
    string(name: 'IMAGE_TAG', defaultValue: "${env.BUILD_NUMBER}", description: 'Tag to apply to images')
    booleanParam(name: 'SKIP_PUSH', defaultValue: false, description: 'Skip pushing images to Docker Hub')
  }

  environment {
    REGISTRY = 'docker.io'
    BACKEND_IMAGE = "${env.REGISTRY}/${params.DOCKER_REPO}-backend:${params.IMAGE_TAG}"
    FRONTEND_IMAGE = "${env.REGISTRY}/${params.DOCKER_REPO}-frontend:${params.IMAGE_TAG}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build Backend Image') {
      steps {
        script {
          sh "docker build -t ${env.BACKEND_IMAGE} -f Dockerfile ."
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        script {
          sh "docker build -t ${env.FRONTEND_IMAGE} -f client/Dockerfile client"
        }
      }
    }

    stage('Scan Images (Trivy)') {
      steps {
        script {
          // Use Trivy Docker image so Jenkins agents don't need trivy preinstalled
          def images = [env.BACKEND_IMAGE, env.FRONTEND_IMAGE]
          for (i = 0; i < images.size(); i++) {
            def img = images[i]
            echo "Scanning ${img} with Trivy (fail on HIGH/CRITICAL vulnerabilities)..."
            // Run trivy as a container and fail pipeline if vulnerabilities found (exit-code 1)
            sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image --exit-code 1 --severity HIGH,CRITICAL ${img}"
          }
        }
      }
    }

    stage('Push to Docker Hub') {
      when { expression { return !params.SKIP_PUSH } }
      steps {
        script {
          // docker-hub credentials must be added to Jenkins Credentials (username/password)
          withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
            sh "docker push ${env.BACKEND_IMAGE}"
            sh "docker push ${env.FRONTEND_IMAGE}"
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Cleaning up local images (optional)'
      sh "docker image rm -f ${env.BACKEND_IMAGE} || true"
      sh "docker image rm -f ${env.FRONTEND_IMAGE} || true"
      sh 'docker logout || true'
    }
    success {
      echo 'Pipeline succeeded: images built, scanned, and pushed.'
    }
    failure {
      echo 'Pipeline failed. Check the logs above to see scan/build/push errors.'
    }
  }
}
