# Git Backup Management Procedures

This document outlines the standardized procedures for managing backups in Git repositories.

## 1. Backup Lifecycle Management

### Creating Backups
- Use git tags to mark backup points: `git tag backup-YYYY-MM-DD`
- For larger backups, create specific branches: `git checkout -b backup/march-1-2025`
- Document purpose of backup in commit messages

### Preserving Backups
- Push backup tags to remote: `git push origin backup-YYYY-MM-DD`
- Ensure GitHub has all backup references: `git push --tags`
- For critical backups, consider creating a compressed archive: 
  ```bash
  tar -czf project-backup-YYYY-MM-DD.tar.gz project-directory/
  ```

### Removing Backups (Safely)
1. **Verification Step**
   - Confirm all valuable content has been integrated: review code, run tests
   - All needed files/components are preserved in main codebase

2. **Tag Creation**
   ```bash
   # Create local tag
   git tag backup-YYYY-MM-DD
   
   # Push tag to GitHub
   git push origin backup-YYYY-MM-DD
   ```

3. **Removal Process**
   ```bash
   # Remove backup directory
   git rm -r backup-directory/
   
   # Commit removal
   git commit -m "Remove backup from YYYY-MM-DD - content integrated and tagged"
   
   # Push changes to remote
   git push origin master  # or current branch
   ```

## 2. Non-Destructive Principles

- **Never overwrite** existing work
- Always **pull latest changes** before modifications: `git pull origin branch-name`
- **Verify before pushing**: `git status` and `git diff` to review changes
- **Use atomic commits**: Each commit should represent one logical change
- Always create **reference points** (tags) before removing backups

## 3. Branch Management 

- **Main Branch (master/main)**
  - Primary development branch
  - Should always be in a stable state
  
- **Backup Branches**
  - Named with clear date/purpose: `backup/YYYY-MM-DD`
  - Should remain untouched once created (historical record)
  - Can be archived with tags before removal

- **Integration Process**
  - Cherry-pick specific changes: `git cherry-pick commit-hash`
  - Merge entire backup: `git merge backup/branch-name`
  - Resolve conflicts carefully, preserving intent of both branches

## 4. Essential Git Commands

### Backup Management
```bash
# Create a backup tag
git tag backup-YYYY-MM-DD

# Push tag to remote
git push origin backup-YYYY-MM-DD

# Create a backup branch
git checkout -b backup/YYYY-MM-DD
git push origin backup/YYYY-MM-DD

# List all backup tags
git tag | grep "backup-"

# List all backup branches
git branch -a | grep "backup/"
```

### Safety Commands
```bash
# Check what will be committed
git diff --cached

# Check what will be removed
git rm -n directory/

# Restore accidentally staged changes
git restore --staged <file>

# Restore an accidentally removed file
git checkout HEAD -- <file>
```

## 5. Automation with Scripts

The `git-cleanup.sh` script in this repository automates many backup management tasks:

- Adding all changes to staging
- Creating commits with descriptive messages
- Managing submodule changes
- Checking status before and after operations

Use it with:
```bash
chmod +x git-cleanup.sh
./git-cleanup.sh
```

## 6. Decision Criteria for Backup Removal

Remove backups when:
1. All valuable content has been integrated into the main project
2. The backup has been properly tagged for future reference
3. The integration has been verified (tests passing, functionality working)
4. The backup is taking significant storage space
5. The backup is no longer needed for active development

Always err on the side of caution - when in doubt, keep backups a bit longer.
