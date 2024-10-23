chrome.storage.local.get(['originalName', 'newName'], function(items) {
  if (items.originalName && items.newName) {
    const bodyText = document.body.innerHTML;
    const regex = new RegExp(items.originalName, 'gi');
    document.body.innerHTML = bodyText.replace(regex, items.newName);
  }
});
