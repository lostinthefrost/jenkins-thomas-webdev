var app = require('../../../express');

app.post  ('/api/user/:userId/website', createWebsite);
app.get   ('/api/user/:userId/website', findWebsitesByUserId);
app.put   ('/api/user/:userId/website', updateWebsite);
app.delete('/api/user/:userId/website', deleteWebsite);
