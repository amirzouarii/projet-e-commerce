// Jenkinsfile - Pipeline complet pour projet e-commerce
pipeline {
    agent any
    options { timestamps() }

    parameters {
        string(name: 'DOCKER_REPO', defaultValue: 'amir/projet-e-commerce', description: 'Docker Hub repo (username/repo)')
        string(name: 'IMAGE_TAG', defaultValue: "${env.BUILD_NUMBER}", description: 'Tag to apply to images')
        booleanParam(name: 'SKIP_PUSH', defaultValue: false, description: 'Skip pushing images to Docker Hub')
    }

    environment {
        REGISTRY = 'docker.io'
        BACKEND_IMAGE = "${REGISTRY}/${params.DOCKER_REPO}-backend:${params.IMAGE_TAG}"
        FRONTEND_IMAGE = "${REGISTRY}/${params.DOCKER_REPO}-frontend:${params.IMAGE_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                echo "Building backend image: ${env.BACKEND_IMAGE}"
                sh "docker build -t ${env.BACKEND_IMAGE} -f Dockerfile ."
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "Building frontend image: ${env.FRONTEND_IMAGE}"
                sh "docker build -t ${env.FRONTEND_IMAGE} -f client/Dockerfile client"
            }
        }

        stage('Scan Images (Trivy)') {
            steps {
                script {
                    def images = [env.BACKEND_IMAGE, env.FRONTEND_IMAGE]
                    for (img in images) {
                        echo "Scanning ${img} with Trivy (fail on HIGH/CRITICAL vulnerabilities)..."
                        sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy image --exit-code 1 --severity HIGH,CRITICAL ${img}
                        """
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            when { expression { return !params.SKIP_PUSH } }
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    echo "Logging in to Docker Hub..."
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    echo "Pushing backend image..."
                    sh "docker push ${env.BACKEND_IMAGE}"
                    echo "Pushing frontend image..."
                    sh "docker push ${env.FRONTEND_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up local images...'
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
