# Chirpy Hugo Assets

This repository provides the JavaScript, CSS, and font assets needed for the Chirpy theme in Hugo.

It can be used as a Hugo Module for theme development or local site builds.

---

## Installation (Remote)

Add the following to your site's `config.toml` or `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/comprofix/chirpy-hugo-assets"
```

Then run:

```bash
hugo mod get
```

This will fetch the latest committed assets from the remote repository.

---

## Installation (Local / Development)

For local development, you can use a local clone instead of the remote module. This is useful if you want to make changes to the assets and test them in your site.

Clone the repository somewhere on your system:

```bash
git clone https://github.com/geekifan/chirpy-hugo-assets.git /path/to/local/chirpy-hugo-assets
```

Then in your site's `go.mod` file, add a replace directive:

```go
replace github.com/geekifan/chirpy-hugo-assets => /path/to/local/chirpy-hugo-assets
```

Now Hugo will use your local copy of the assets when building the site.

Run:

```bash
hugo mod tidy
hugo mod clean
hugo mod get
```

to refresh modules and ensure everything is linked correctly.

---

## Folder Structure

The assets are organized as follows:

```
assets/
  js/                # JavaScript libraries
    clipboard/
    dayjs/
    glightbox/
    lazysizes/
    mermaid/
    tocbot/
fontawesome-free/     # Font Awesome CSS & webfonts
static/
  fonts/             # Lato, Source Sans Pro fonts
```

---

## Updating Assets

All assets are managed via `npm`. To update packages or add new ones:

```bash
npm install
node scripts/copy-assets.js
```

This script copies the necessary files from `node_modules` to the Hugo assets folders.

### Supported Packages

| Dependency                                                                                    |   Version |
| :-------------------------------------------------------------------------------------------- | --------: |
| [Clipboard](https://www.jsdelivr.com/package/npm/clipboard)                                   |  `2.0.11` |
| [Day.js](https://www.jsdelivr.com/package/npm/dayjs)                                          | `1.11.18` |
| [Font Awesome Free](https://www.jsdelivr.com/package/npm/@fortawesome/fontawesome-free)       |   `7.0.0` |
| [GLightbox](https://www.jsdelivr.com/package/npm/glightbox)                                   |   `3.3.1` |
| [Lazysizes](https://www.jsdelivr.com/package/npm/lazysizes)                                   |   `5.3.2` |
| [Mermaid](https://www.jsdelivr.com/package/npm/mermaid)                                       |  `11.10.1` |
| [Tocbot](https://www.jsdelivr.com/package/npm/tocbot)                                         |  `4.36.4` |
| [Lato Font](https://www.jsdelivr.com/package/npm/lato-font)                                   |   `3.0.0` |
| [Source Sans Pro](https://www.jsdelivr.com/package/npm/source-sans-pro)                       |   `3.6.0` |

---

## Acknowledgements

This project is based on [cotes2020/chirpy-static-assets](https://github.com/cotes2020/chirpy-static-assets). We acknowledge their original contributions and work.
