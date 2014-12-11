Package.describe({
    name: 'shammar13:busboy',
    summary: 'Add Busboy to Meteor',
    version: '1.0.1',
    git: 'https://github.com/stuartha13/meteor-busboy.git'
});

Npm.depends({
    "busboy": "0.2.9"
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.export('Busboy');
    api.addFiles(['busboy.js'], 'server');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('shammar13:busboy');
    api.addFiles('busboy-tests.js');
});
