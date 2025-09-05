pipeline {
    agent any

    tools {
        maven 'MAVEN'       // Exact name from Jenkins Global Tool Config
        nodejs 'NodeJS'     // Exact name from Jenkins NodeJS plugin config
        jdk 'JAVA'          // Exact name from Jenkins JDK config
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('SampleBackend') {
                    bat 'mvn -B clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('SampleFrontend/BooksLibrary') {
                    bat 'npm ci'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'SampleBackend/target/*.jar', fingerprint: true
                archiveArtifacts artifacts: 'SampleFrontend/BooksLibrary/build/**', allowEmptyArchive: true
            }
        }

        stage('Deploy (example)') {
            steps {
                bat '''
                REM Copy backend JAR to Linux server
                pscp SampleBackend\\target\\*.jar user@server:/opt/apps/

                REM Run backend on Linux server
                plink user@server "nohup java -jar /opt/apps/your-app.jar > /opt/apps/app.log 2>&1 &"
                '''
            }
        }
    }

    post {
        success { echo "✅ Pipeline finished successfully" }
        failure { echo "❌ Pipeline failed" }
    }
}
