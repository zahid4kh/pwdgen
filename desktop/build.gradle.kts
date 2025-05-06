import org.jetbrains.compose.desktop.application.dsl.TargetFormat
import java.time.Year
import java.util.UUID

plugins {
    kotlin("jvm")
    id("org.jetbrains.compose")
    id("org.jetbrains.kotlin.plugin.compose")
    kotlin("plugin.serialization") version "2.1.0"
}


group = "zahid4kh.pwdgen"
version = "1.0.2"

repositories {
    mavenCentral()
    maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
    google()
}

dependencies {
    implementation(compose.desktop.currentOs)
    implementation(compose.material3)
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core-jvm:1.6.3")
}

tasks.register("generateUpgradeUuid") {
    group = "help"
    description = "Generates a unique UUID to be used for the Windows MSI upgradeUuid."
    doLast {
        println("--------------------------------------------------")
        println("Generated Upgrade UUID (must be pasted in the upgradeUuid for windows block only once so the MSI installer recognizes the update and does the uninstall/install):")
        println(UUID.randomUUID().toString())
        println("--------------------------------------------------")
    }
}

tasks.register("projectDir"){
    doLast{
        println("Project dir is: ${project.projectDir}")
        //returns:  pwdgen/desktop
    }
}

compose.desktop {
    application {
        mainClass = "MainKt"

        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb, TargetFormat.Exe)
            packageName = "pwdgen"
            packageVersion = version.toString()
            description = "Simple Password Generator"
            licenseFile.set(project.layout.projectDirectory.file("LICENSE.txt"))
            vendor = "Zahid Khalilov"
            copyright = "© ${Year.now().value} Zahid Khalilov. All rights reserved"

            val iconsRoot = project.layout.projectDirectory.dir("src/main/resources/icons")

            linux {
                iconFile.set(iconsRoot.file("linux.png"))
                debMaintainer = "Zahid Khalilov <halilzahid@gmail.com>"
                appCategory = "Utilities"
                menuGroup = "Utilities"
                installationPath = "/opt/pwdgen"
                shortcut = true
            }

            windows {
                iconFile.set(iconsRoot.file("windows.ico"))
                dirChooser = true
                menu = true
                shortcut = true
                upgradeUuid = "16047d3d-e982-442e-aa4b-e4e350bab790"
            }

            macOS {
                iconFile.set(iconsRoot.file("macos.icns"))
                bundleID = "zahid4kh.pwdgen"
                packageName = "pwdgen"
                dockName = "pwdgen"
            }
        }
    }
}
