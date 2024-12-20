#!/usr/bin/env pwsh

BeforeAll {
    $parentFolder = (Split-Path $PSScriptRoot -Parent)
    $parentFolderItems = Get-ChildItem -Path $parentFolder -Force
    $htmlFolderItems = Get-ChildItem -Path "$($parentFolder)" -Force
}

Describe 'QA' -Tag 'System' {
    Context 'Repository has the correct structure' {
        It "directory contains the required source control files: $($sourceControlFiles -join ',')" {
            param ($sourceControlFiles = @('.gitattributes', '.gitignore'))
            $sourceControlFiles | Should -BeIn $parentFolderItems.Where{ -not $_.PSIsContainer }.Name -Because 'root directory should include the required source control files'
        }

        It "Directory contains the required project folders: $($parentFolders -join ',')" {
            param ($parentFolders = @('release', 'test'))
            $parentFolders | Should -BeIn $parentFolderItems.Where{ $_.PSIsContainer }.Name
        }

        It "HTML application contains the required project folders: $($htmlFolders -join ',')" {
            param($htmlFolders = @('src', 'tasks'))
            $htmlFolders | Should -BeIn $htmlFolderItems.Where{ $_.PSIsContainer }.Name
        }

        It "Directory does not contain build artifacts" {
            'build' | Should -Not -BeIn $htmlFolderItems.Where{ $_.PSIsContainer }.Name -Because "'build' should not exist at root'"
        }
    }
}
