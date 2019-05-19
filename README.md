<h1>Description</h1>

> <h2> What cause me to publish this package?</h2>
<h3> During the worktime, what I do most is to fix bugs. So I am have to get files form the source according files' name. Initially, It's ok because the amount of files just a few, but now the counts of files become more and more. So I can't tolerate this any more. This is main reason why I write this package.</h3>

> <h2>Usage</h2>

```shell
    thunder --version
```
### or you can type this
```shell
    thunder -v
```
### above command will display the current verison of package you install

```shell
    thunder logo
```
### above command will show a logo like below:
```
  ________  __   __  __   __  ___  _  ____     _____  ___
 /__  ___/ / /__/ / / /  / / /   |/ / / __ \  / ___/ / _ \
   / /    /  __  / / /__/ / / /| | / / /_/ / / /=== / _ _/
  /_/    /__/ /_/ /_____ / /_/ |__/ /_____/ /____/ /_/ \_\ © VERSION <VERSION>
```

```shell
    thunder init --yes(-y)
```
### above command uesd to init the Config files called filesConfig.json fastly

```shell
    thunder config --origin <dirName>
```
### or you can type this for simple
```shell
    thunder config -o <dirName>
```
### above command used to set the origin floder of source that you want to get files

```shell
    thunder config --dest <dirName>
```
### like 'config -o <dirName>', you also can type 'config -d <dirName>' to make the same result.

### except those, command 'config' has a alias named 'c', so you can excute command as below:
```shell
    thunder c <option> <dirName>
```
### if you want get all files, you can command
```shell
    thunder fileFetch -a(--all)
```
### if you want to mkdir diff, you can command
```shell
    thunder fileFetch -d(--diff)
```
### if you want to get part files, you can command
```shell
    thunder fileFetch -p(--part) <filename>
```

### 🚩above commands are the most important command that you can get files you config in filesConfig.

<h2>ChangeLOG</h2>

Version|change|type|
---|:--:|---:
1.3.0|abstract the process of setting filsConfig to funciton abstractSetConfig|optimization
1.4.0|add function 'thunder fileFetch -p [filename]'

<h2>Issues</h2>

+ <h3>there are some logic problems needed to be fix;</h3>
+ <h3>command 'init --yes' will touch filsConfig.json fastly and automaticly, you can config floder and files. why I don't write commands to do that work? I think if files to much and folders are not only one, command is not convenient. But I still think how to realize this by command in reason.</h3>

<h2>🌈Future</h2>

### as so far, the pakcage just realize above functions temporarily. But I'm still planning to develop more functions to full this package and do some optimizations to make it better and stronger. 

<h2>Plan</h2>

### recently, I want to add a few new functions. Details will be viwed as long as new version released.