document.getElementById('replaceForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const originalName = document.getElementById('originalName').value;
  const newName = document.getElementById('newName').value;

  if (originalName && newName) {
    chrome.storage.local.set({ originalName, newName }, function() {
      console.log(`Stored ${originalName} to be replaced with ${newName}`);
    });

    // Tell content.js to replace the name
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: replaceNameOnPage,
        args: [originalName, newName]
      });
    });
  }
});

function replaceNameOnPage(originalName, newName) {
  const bodyText = document.body.innerHTML;
  const regex = new RegExp(originalName, 'gi');
  document.body.innerHTML = bodyText.replace(regex, newName);
}
