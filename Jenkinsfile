pipeline {
    agent any

    tools {
        maven 'MAVEN'   // Must match Jenkins Global Tool Config
        jdk 'JAVA'      // Must match Jenkins JDK config
        // NodeJS removed from tools; will use Windows PATH
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('SampleBackend/bookslibrary') { 
                    // Windows: build backend
                    bat 'mvn -B clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('SampleFrontend/BooksLibrary') {
                    // Windows: build frontend
                    bat 'npm ci'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Archive backend JAR
                archiveArtifacts artifacts: 'SampleBackend/bookslibrary/target/*.jar', fingerprint: true
                // Archive frontend build folder
                archiveArtifacts artifacts: 'SampleFrontend/BooksLibrary/build/**', allowEmptyArchive: true
            }
        }

       stage('Deploy Backend to Tomcat') {
    steps {
        bat '''
        REM Delete old WAR file if it exists
        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookslibrary.war" (
            del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookslibrary.war"
        )

        REM Delete exploded folder if it exists
        if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookslibrary" (
            rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\bookslibrary"
        )

        REM Copy new WAR file to Tomcat webapps
        copy "SampleBackend\\bookslibrary\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
        '''
    }
}

}


    }

    post {
        success { echo "✅ Pipeline finished successfully" }
        failure { echo "❌ Pipeline failed" }
    }
}
