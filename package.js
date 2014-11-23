Package.describe({
    name: 'stuartha13:busboy',
    summary: 'Add Busboy to Meteor',
    version: '1.0.0',
    git: 'https://github.com/stuartha13/meteor-busboy.git'
});

Npm.depends({
    "busboy": "0.2.9"
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.export('Busboy');
    api.addFiles(['stuartha13:busboy.js'], 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('stuartha13:busboy');
    api.addFiles('stuartha13:busboy-tests.js');
});
