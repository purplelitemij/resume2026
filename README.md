# resume2026
Repo to track resume building in 2026


# Building a Resume & Portfolio Site (Hugo + GitHub Pages)

This README tracks building my resume and portfolio using Hugo
and GitHub Pages, so anyone reading it can set up their own version — a
resume and a portfolio site, each in their own trackable GitHub repo.

**Tool stack used:** Homebrew, Git, GitHub CLI (`gh`), Hugo (extended), Go, VS Code
**Also installed for broader dev work (not strictly required for this project):** JDK, Python, Claude Desktop

**Two-repo structure:**
| Repo | Purpose | Hosted at | Sample|
|---|---|---|---|
| `<username>.github.io` | Portfolio (the primary link you'll share) | `https://<username>.github.io` | purplelitemij.github.io|
| `resume` | Resume (Hugo-generated page/PDF) | `https://<username>.github.io/resume` | purplelitemij/resume|

---

## 1. Prerequisites

These steps assume macOS and a completely new setup — no GitHub account, no
tools installed yet.

### 1.1 Install Homebrew
Homebrew is a package manager for macOS — it's how you'll install everything
else below with one-line commands.

Open **Terminal** (Cmd+Space, type "Terminal", hit Enter) and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen prompts. When it finishes, it will print 1–2 commands to
add Homebrew to your PATH — run those (usually involves adding a line to
`~/.zprofile`). Verify:

```bash
brew --version
```

### 1.2 Install Git
```bash
brew install git
git --version
```

### 1.3 Create a GitHub Account
1. Go to [github.com/join](https://github.com/join).
2. Sign up with an email, username, and password. Note that this username is what will
   appear in your URLs, e.g. `github.com/yourusername`, so use one that you can remember.
3. Verify your email address.

### 1.4 Configure Git with Your Identity
```bash
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

### 1.5 Install GitHub CLI (`gh`)
The GitHub CLI lets you create repos, open pull requests, and manage GitHub
directly from the terminal — no need to touch a browser for most tasks.

```bash
brew install gh
gh --version
```

**Authenticate:**
```bash
gh auth login
```
You'll be asked:
- Select `GitHub.com`
- Protocol: **HTTPS** 
- Authenticate with your GitHub credentials: **Login with a web browser**
  (it'll give you a one-time code, open a browser tab, paste the code, and
  approve).

Verify you're logged in:
```bash
gh auth status
```

### 1.6 Install Hugo (Extended Version)
Hugo is the static site generator that builds both the resume and portfolio
from Markdown + themes into a fast HTML site.

```bash
brew install hugo
hugo version
```
Confirm the output says `extended` as some Hugo themes require this.

### 1.7 Install Go
Hugo's extended features rely on Go under the hood.

```bash
brew install go
go version
```

### 1.8 Install VS Code
```bash
brew install --cask visual-studio-code
```
Recommended extensions once installed (Extensions panel, Cmd+Shift+X):
- **Hugo Language and Syntax Support**
- **Front Matter CMS** (optional, nice UI for editing Hugo content)
- **GitLens** (visualize Git history/blame inline)

### 1.9 (Optional) JDK & Python
Not required for the Hugo/GitHub workflow itself, but useful for other scripting or tooling tasks you may layer on later:
```bash
brew install openjdk
brew install python
```

### 1.10 (Optional) Claude Desktop
Used for drafting content, troubleshooting, and general project documentation. Download from [claude.ai/download](https://claude.ai/download).

### 1.11 Verify Everything
```bash
brew --version
git --version
gh --version
gh auth status
hugo version
go version
code --version
```
If each command returns a version number (and `gh auth status` shows you're
logged in), you're ready for the next section.

---

## 2. Next Steps: Creating the GitHub Repos

We're creating **two repos**: one for the portfolio (the special GitHub
Pages user-site repo), one for the resume (a normal project repo also
published via GitHub Pages).

### 2.1 Create the Portfolio Repo
This repo's name is **not arbitrary** — GitHub treats a repo named exactly
`<your-username>.github.io` as your personal site, served at the root domain
`https://<your-username>.github.io` with no extra setup needed for the URL.

```bash
gh repo create <your-username>.github.io --public --clone
cd <your-username>.github.io
```

- `--public` — required for free GitHub Pages hosting on a personal account
- `--clone` — creates the repo on GitHub *and* clones it to your machine in
  one step, landing you in a new local folder

### 2.2 Create the Resume Repo
This one can be named anything — `resume` keeps it simple and gives a clean
URL (`https://<your-username>.github.io/resume`).

```bash
cd ..    # back out of the portfolio folder first
gh repo create resume --public --clone
cd resume
```

### 2.3 Confirm Both Repos Exist
```bash
gh repo list <your-username>
```
You should see both `<your-username>.github.io` and `resume` listed.

### 2.4 Starter Commit (so each repo isn't empty)
Do this in **each** repo folder:
```bash
echo "# My Portfolio" > README.md   # (or "# My Resume" in the resume repo)
git add README.md
git commit -m "Initial commit"
git push
```

At this point you have two empty-but-tracked repos on GitHub, both cloned
locally, both authenticated via `gh` — ready for Hugo to be scaffolded into
them.

---