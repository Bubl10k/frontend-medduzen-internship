const downloadResults = (response, format) => {
  let results;
  let fileType;

  if (format === 'csv') {
    results = response;
    fileType = 'text/csv';
  } else {
    results = JSON.stringify(response, null, 2);
    fileType = 'application/json';
  }

  const blob = new Blob([results], {
    type: fileType,
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'quiz_results.' + format;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
};

export default downloadResults;
