# ShakeFile
A Javascript package for working with files and ShakeFSs using the [File](https://developer.mozilla.org/en-US/docs/Web/API/File) and [ShakeFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API) APIs. Edit files from as high level as text to as low level as the binary. Includes [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for ease of use in your existing applications.

## Build Stats
[![npm version](https://badge.fury.io/js/shake-file.svg)](//npmjs.com/package/shake-file)


![GH Pack workflow](https://github.com/mastashake08/directoryjs/actions/workflows/gh-pack.yml/badge.svg)

![NPM workflow](https://github.com/mastashake08/directoryjs/actions/workflows/npm.yml/badge.svg)

![Release workflow](https://github.com/mastashake08/directoryjs/actions/workflows/release.yml/badge.svg)

![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/mastashake08/directoryjs)

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/mastashake08/directoryjs/main)

![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/w/mastashake08/directoryjs)

![GitHub contributors](https://img.shields.io/github/contributors/mastashake08/directoryjs)

![GitHub top language](https://img.shields.io/github/languages/top/mastashake08/directoryjs)




## Follow Me On Social
![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/jyroneparker)

![YouTube Channel Views](https://img.shields.io/youtube/channel/views/UCFDt6Z1zxEF0f_aY0i6Bcfg)

![GitHub followers](https://img.shields.io/github/followers/mastashake08)

![Discord](https://img.shields.io/discord/529883878765232128)

## Sponsor A Hacker
![GitHub Sponsors](https://img.shields.io/github/sponsors/mastashake08)


## Classes

<dl>
<dt><a href="#ShakeFile">ShakeFile</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#addToDom
Add file elements to DOM.">addToDom
Add file elements to DOM.()</a> ⇒ <code>void</code></dt>
<dd></dd>
</dl>

<a name="ShakeFile"></a>

## ShakeFile
**Kind**: global class  

* [ShakeFile](#ShakeFile)
    * [new ShakeFile(config)](#new_ShakeFile_new)
    * [.saveFile()](#ShakeFile+saveFile) ⇒

<a name="new_ShakeFile_new"></a>

### new ShakeFile(config)
Create a ShakeFile.


| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | The config object. |
| config.file | <code>File</code> \| <code>Blob</code> \| <code>null</code> | The File/Blob to be acted on |
| config.showDom | <code>Boolean</code> | Boolean flag to determin if DOM elements should be created |

<a name="ShakeFile+saveFile"></a>

### shakeFile.saveFile() ⇒
**Kind**: instance method of [<code>ShakeFile</code>](#ShakeFile)  
**Returns**: Boolean  
<a name="addToDom
Add file elements to DOM."></a>

## addToDom
Add file elements to DOM.() ⇒ <code>void</code>
**Kind**: global function  
**Returns**: <code>void</code> - - no return type  
