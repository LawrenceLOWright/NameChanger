document.getElementById('replaceForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const originalName = document.getElementById('originalName').value;
  const newName = document.getElementById('newName').value;

  if (originalName && newName) {
    chrome.storage.local.get(['namePairs'], function(result) {
      let namePairs = result.namePairs || [];
      namePairs.push({ originalName, newName });
      
      chrome.storage.local.set({ namePairs }, function() {
        console.log(`Stored: Replace ${originalName} with ${newName}`);
        updateNameList();
      });
    });
  }

  document.getElementById('originalName').value = '';
  document.getElementById('newName').value = '';
});

// Function to update the list of current name replacements
function updateNameList() {
  chrome.storage.local.get(['namePairs'], function(result) {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = ''; // Clear existing list

    const namePairs = result.namePairs || [];
    namePairs.forEach((pair, index) => {
      const li = document.createElement('li');
      li.textContent = `Replace "${pair.originalName}" with "${pair.newName}"`;

      // Create remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        removeNamePair(index);
      });

      li.appendChild(removeButton);
      nameList.appendChild(li);
    });
  });
}

// Function to remove a name-replacement pair
function removeNamePair(index) {
  chrome.storage.local.get(['namePairs'], function(result) {
    let namePairs = result.namePairs || [];
    namePairs.splice(index, 1); // Remove the selected pair

    chrome.storage.local.set({ namePairs }, function() {
      console.log('Removed name pair at index', index);
      updateNameList();
    });
  });
}

// Load the list of current replacements on popup load
document.addEventListener('DOMContentLoaded', updateNameList);
