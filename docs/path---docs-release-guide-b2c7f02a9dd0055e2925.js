webpackJsonp([39816498202084],{587:function(e,n){e.exports={data:{markdownRemark:{html:'<h2 id="hawtio-release-guide"><a href="#hawtio-release-guide" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>hawtio release guide</h2>\n<p>The following walks through how we make a release.</p>\n<ul>\n<li>\n<p>Pop onto <a href="http://hawt.io/community/index.html">IRC</a> and let folks know you\'re about to cut a release</p>\n</li>\n<li>\n<p>Now pull and make sure things build locally fine first :)</p>\n<pre><code>mvn release:prepare -P release,grunt\n</code></pre>\n</li>\n</ul>\n<p>If the build fails then rollback via</p>\n<pre><code>mvn release:rollback -P release,grunt\n</code></pre>\n<p>The tag should get auto-defaulted to something like <strong>hawtio-1.2</strong></p>\n<pre><code>    mvn release:perform -P release,grunt\n</code></pre>\n<p>when the release is done:</p>\n<pre><code>    git push --tags\n</code></pre>\n<p>Now go to the <a href="https://oss.sonatype.org/index.html#stagingRepositories">OSS Nonatype Nexus</a> and Close then Release the staging repo</p>\n<p>Now, go into github issues and create a new milestone (if not already created) for the release number that you just released.  Close this milestone.  Now go through each open milestonee and move all closed issues to your new milestone.  Also move issues that are closed but have no milestone to the new milestone.  This will ensure that all fixed issues in the last development period will be correctly associated with the release that the fix was introduced in.</p>\n<p>Update the changelog with links to your milestone which will list all the fixes/enhancements that made it into the release.  Also mention any major changes in the changelog.</p>\n<h3 id="update-the-new-version-number"><a href="#update-the-new-version-number" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Update the new version number:</h3>\n<p>Now update the new dev version the following files so the new dev build doens\'t barf</p>\n<ul>\n<li><a href="https://github.com/hawtio/hawtio/blob/master/hawtio-web/src/test/specs/SpecRunner.html#L88">SpecRunner.html</a></li>\n</ul>\n<p>Now update the following files for the new release version:</p>\n<ul>\n<li>*<em>/</em>.md - <em>apart</em> from changes.md!</li>\n<li>website/pom.xml</li>\n<li>website/src/chrome/extension.xml</li>\n<li>chrome-extension/src/resources/manifest.json</li>\n</ul>\n<h3 id="chrome-extension"><a href="#chrome-extension" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chrome Extension</h3>\n<p>One the release has sync\'d to <a href="http://central.maven.org/maven2/io/hawt/hawtio-web/">maven central</a> and the new website is up with the new extension.xml (see above), you\'ll need to:</p>\n<ul>\n<li>\n<p>go to the chrome-extension directory</p>\n</li>\n<li>\n<p>check the manifest has the correct new view (see above on version number changes)</p>\n</li>\n<li>\n<p>run</p>\n<p>mvn install</p>\n</li>\n<li>\n<p>now go to the <a href="https://chrome.google.com/webstore/developer/dashboard/ua69cc79bd081162fca3bb58f3e36b3b4">Chrome Web Store</a> and upload the <strong>target/extension.zip</strong> file and hit publish</p>\n</li>\n</ul>\n<h3 id="now-its-beer-oclock"><a href="#now-its-beer-oclock" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Now its beer o\'clock!</h3>\n<p>Now drink a beer! Then another! There, thats better now isn\'t it!</p>',frontmatter:{title:""}}},pathContext:{slug:"/docs/release-guide/"}}}});
//# sourceMappingURL=path---docs-release-guide-b2c7f02a9dd0055e2925.js.map