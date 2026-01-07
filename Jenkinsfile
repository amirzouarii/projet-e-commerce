pipeline {
    agent any
    options { timestamps() }

    triggers { pollSCM('H/5 * * * *') }

    parameters {
        booleanParam(name: 'SKIP_PUSH', defaultValue: false, description: 'Skip pushing images to Docker Hub')
    }

   environment {
        REGISTRY = 'docker.io'
        IMAGE_BACKEND = "${REGISTRY}/amirzouari15/projet-e-commerce-backend:${BUILD_NUMBER}"
        IMAGE_FRONTEND = "${REGISTRY}/amirzouari15/projet-e-commerce-frontend:${BUILD_NUMBER}"
    }


    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/amirzouarii/projet-e-commerce.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Build Backend Image') {
            steps {
                echo "Building backend image: ${env.IMAGE_BACKEND}"
                sh "docker build -t ${env.IMAGE_BACKEND} ."
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "Building frontend image: ${env.IMAGE_FRONTEND}"
                sh "docker build -t ${env.IMAGE_FRONTEND} client"
            }
        }

        stage('Push Images to Docker Hub') {
            when { expression { return !params.SKIP_PUSH } }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    echo "Logging in to Docker Hub..."
                    sh 'echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin'
                    echo "Pushing backend image..."
                    sh "docker push ${env.IMAGE_BACKEND}"
                    echo "Pushing frontend image..."
                    sh "docker push ${env.IMAGE_FRONTEND}"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up local images...'
            sh "docker image rm -f ${env.IMAGE_BACKEND} || true"
            sh "docker image rm -f ${env.IMAGE_FRONTEND} || true"
            sh 'docker logout || true'
            sh 'docker system prune -af || true'
        }
        success {
            echo 'Pipeline succeeded: images built and pushed.'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}
