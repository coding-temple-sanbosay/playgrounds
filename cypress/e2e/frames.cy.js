describe('Frame Tests', () => {
  // Prevent tests from failing on uncaught exceptions from the app
  Cypress.on('uncaught:exception', (err, runnable) => {
    // If the error contains "setup is not a function", ignore it
    if (err.message.includes('setup is not a function')) {
      return false; // Prevent Cypress from failing the test
    }
    // Allow other errors to fail the test
    return true;
  });

  it('should interact with the first frame', () => {
    cy.visit('https://demoqa.com/frames'); // Visit the Frames page

    // Increase timeout to wait for iframe to load
    cy.get('#frame1', { timeout: 20000 }).then(($iframe) => {
      const $body = $iframe.contents().find('body'); // Access the iframe body
      cy.wrap($body).find('#sampleHeading').should('have.text', 'This is a sample page'); // Validate text inside the iframe
    });
  });

  it('should interact with the nested frames', () => {
    cy.visit('https://demoqa.com/nestedframes'); // Visit the Nested Frames page

    // Increase timeout and improve selector for the parent iframe
    cy.get('iframe').first().then(($parentFrame) => {
      const $parentBody = $parentFrame.contents().find('body'); // Access the parent frame body

      // Optional: Check if the parent body contains any text to help debug
      cy.wrap($parentBody).invoke('text').then((text) => {
        cy.log('Parent frame content: ', text); // Log the content for debugging
      });

      // Ensure the parent frame contains 'Parent frame' or a valid placeholder
      cy.wrap($parentBody).should('contain', 'Parent frame');

      // Now find the child iframe inside the parent frame
      cy.wrap($parentBody).find('iframe').then(($childFrame) => {
        const $childBody = $childFrame.contents().find('body'); // Access the child frame body

        // Optional: Log the child body content for debugging
        cy.wrap($childBody).invoke('text').then((text) => {
          cy.log('Child frame content: ', text);
        });

        // Validate the child iframe contains the expected content
        cy.wrap($childBody).should('contain', 'Child Iframe');
      });
    });
  });
});
