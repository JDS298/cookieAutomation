const { findElementInBanner } = require('../content.js');

describe('findElementInBanner function', () => {
  // Setup a mock banner and list of descriptions
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="banner">
      <a href="https://example.com/page1" class="link" aria-label="Page 1">Link 1</a>
      <div data-track-action="Action 2">Action 2</div>
      <span id="uniqueID">Unique Content</span>
      <p class="description" title="Description Title">Description</p>
      <button data-a-target="targetButton">Target Button</button>
      <input data-testid="testInput" value="Test Input">
      <label data-label="testLabel">Test Label</label>
    </div>
  `;
  });

  test('returns element with matching href attribute', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['page1'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    expect(result.href).toContain('page1');
  });
  
  test('returns element with matching aria-label attribute', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['Page 1'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    expect(result.getAttribute('aria-label')).toContain('Page 1');
  });

  test('returns element with matching data-track-action attribute', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['Action 2'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    expect(result.getAttribute('data-track-action')).toBe('Action 2');
  });

  test('returns element with matching id attribute', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['uniqueID'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    expect(result.id).toBe('uniqueID');
  });

  test('returns element with matching data-a-target attribute', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['targetButton'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    expect(result.getAttribute('data-a-target')).toBe('targetButton');
  });

  test('returns element with matching data-testid attribute', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['testInput'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    expect(result.getAttribute('data-testid')).toBe('testInput');
  });
  
  test('returns element with matching data-label attribute', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['testLabel'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    expect(result.getAttribute('data-label')).toBe('testLabel');
  });
  
  test('returns null when no elements match descriptions', () => {
    const banner = document.querySelector('#banner');
    // A description that doesn't match any elements in the setup
    const descriptions = ['nonexistentDescription'];
    const result = findElementInBanner(banner, descriptions);
    expect(result).toBeNull();
  });
  
  test('returns the first matching element based on attribute priority', () => {
    // Setup DOM with multiple elements that could match based on different attributes
    document.body.innerHTML = `
      <div id="banner">
        <a href="https://example.com/match" class="info" aria-label="Info">First Match</a>
        <div aria-label="match" class="info">Second Match</div>
        <span data-track-action="match" class="info">Third Match</span>
        <button id="match" class="info">Fourth Match</button>
        <input data-testid="match" value="Fifth Match">
      </div>
    `;
  
    const banner = document.querySelector('#banner');
    const descriptions = ['match']; // This description matches multiple elements
    const result = findElementInBanner(banner, descriptions);
    
    expect(result).not.toBeNull();
  
    // Since 'href' attribute is checked first and only the <a> element has it,
    // the function should return this <a> element as the first match.
    expect(result.href).toContain('https://example.com/match');
  });

  test('returns null when the list of descriptions is empty', () => {
    const banner = document.querySelector('#banner');
    const descriptions = []; // Empty list of descriptions
    const result = findElementInBanner(banner, descriptions);
    
    expect(result).toBeNull();
  });

  test('returns element with an exact match of attribute value', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['Description Title']; 
    const result = findElementInBanner(banner, descriptions);
  
    expect(result).not.toBeNull();
    expect(result.title).toBe('Description Title');
  });

  test('identifies element based on partial match of attribute value', () => {
    const banner = document.querySelector('#banner');
    const descriptions = ['page']; 
    const result = findElementInBanner(banner, descriptions);
    expect(result).not.toBeNull();
    // Assuming 'href' is checked first and contains 'page', this should match the <a> element
    expect(result.href).toContain('page');
  });

});
