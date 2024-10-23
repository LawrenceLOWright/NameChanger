chrome.storage.local.get(['namePairs'], function(result) {
  const namePairs = result.namePairs || [];

  namePairs.forEach(pair => {
    const regex = new RegExp(pair.originalName, 'gi');
    document.body.innerHTML = document.body.innerHTML.replace(regex, pair.newName);
  });
});
