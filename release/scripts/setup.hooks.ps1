#!/usr/bin/env pwsh

try {
    # Copy scripts to './git/hooks folder'
    $parentFolder = Split-Path -Path (Split-Path $PSScriptRoot -Parent) -Parent
    $prepush = New-Item -Path $parentFolder/.git/hooks -Name pre-push -ItemType HardLink -Value $parentFolder/release/hooks/pre-push -Force
    $precommit = New-Item -Path $parentFolder/.git/hooks -Name pre-commit -ItemType HardLink -Value $parentfolder/release/hooks/pre-commit -Force

    # Set executable permissions to files
    chmod 755 $prepush
    chmod 755 $precommit
    Write-Host "Copied scripts to .git/hooks and updated permissions"
}
catch {
    Write-Error "An error occured while configuring git hooks: $_"
    exit 1
}
