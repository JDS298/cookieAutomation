const { findElementInDoc } = require('../content.js');

describe('findElementInDoc function', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div>
          <span aria-label="findMeByAriaLabel" class="testClass" id="testId">Aria Label</span>
          <div data-a-target="targetValue">Data A Target</div>
          <input data-testid="testInputId" value="Test Input">
          <article bundlename="bundleNameValue">Bundle Name</article>
          <img class ="excludedElementDescription">
        </div>
      `;
    });
  
    test('finds element by aria-label', () => {
      const descriptions = ['findMeByAriaLabel'];
      const result = findElementInDoc(descriptions);
      expect(result).not.toBeNull();
      expect(result.getAttribute('aria-label')).toBe('findMeByAriaLabel');
    });
  
    test('finds element by class', () => {
      const descriptions = ['testClass'];
      const result = findElementInDoc(descriptions);
      expect(result).not.toBeNull();
      expect(result.classList.contains('testClass')).toBe(true);
    });
  
    test('finds element by id', () => {
      const descriptions = ['testId'];
      const result = findElementInDoc(descriptions);
      expect(result).not.toBeNull();
      expect(result.id).toBe('testId');
    });
  
    test('finds element by data-a-target', () => {
      const descriptions = ['targetValue'];
      const result = findElementInDoc(descriptions);
      expect(result).not.toBeNull();
      expect(result.getAttribute('data-a-target')).toBe('targetValue');
    });
  
    test('finds element by data-testid', () => {
      const descriptions = ['testInputId'];
      const result = findElementInDoc(descriptions);
      expect(result).not.toBeNull();
      expect(result.getAttribute('data-testid')).toBe('testInputId');
    });
  
    test('finds element by bundlename', () => {
      const descriptions = ['bundleNameValue'];
      const result = findElementInDoc(descriptions);
      expect(result).not.toBeNull();
      expect(result.getAttribute('bundlename')).toBe('bundleNameValue');
    });

    test('returns null when no elements match descriptions', () => {
        const descriptions = ['nonexistent'];
        const result = findElementInDoc(descriptions);
        expect(result).toBeNull();
      });
      
      // Assuming your setup already includes elements for testing exact and partial matches
test('identifies element with exact match', () => {
    const descriptions = ['testClass']; // Assuming an exact match exists
    const result = findElementInDoc(descriptions);
    expect(result).not.toBeNull();
  });
  
  test('identifies element with partial match', () => {
    const descriptions = ['testCl']; // Assuming this partial text can still find the element
    const result = findElementInDoc(descriptions);
    expect(result).not.toBeNull();
  });

  
  test('returns the first matching element among multiple candidates', () => {
    // Custom DOM setup for this test
    document.body.innerHTML = `
      <div>
        <div class="match" id="secondMatch" aria-label="matchLabel">First</div>
        <div data-testid="match" class="other">Second </div>
        <div aria-label="matchLabel" class="match">Third</div> <!-- This should be matched first -->
        <div id="match">Fourth</div>
      </div>
    `;
  
    const descriptions = ['matchLabel']; // These descriptions match multiple elements
    const result = findElementInDoc(descriptions);
    
    // Check that the function returns the first matching element
    // In the given setup, the first div with the class "match" and aria-label "matchLabel" should be returned
    expect(result).not.toBeNull();
    expect(result.textContent).toContain('First'); // Verifying it's the first matching element
  });

  test('excludes specified elements from search', () => {
    const descriptions = ['excludedElementDescription'];
    const result = findElementInDoc(descriptions);
    // Assuming 'excludedElementDescription' is only present in excluded elements
    expect(result).toBeNull();
  });

  test('returns null when descriptions list is empty', () => {
    const descriptions = [];
    const result = findElementInDoc(descriptions);
    expect(result).toBeNull();
  });

  test('returns null when searching for nonexistent attributes', () => {
    const descriptions = ['nonexistentAttribute'];
    const result = findElementInDoc(descriptions);
    expect(result).toBeNull();
  });
  });
  