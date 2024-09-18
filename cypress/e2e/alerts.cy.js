// Added this comment for testing differentiation
describe('Testing Alerts on demoqa.com', () => {
  // Your existing test code
});




describe('Alert Tests', () => {
  // Prevent tests from failing on uncaught exceptions from the app
  Cypress.on('uncaught:exception', (err, runnable) => {
    // If the error contains "setup is not a function", ignore it
    if (err.message.includes('setup is not a function')) {
      return false; // Prevent Cypress from failing the test
    }
    // Allow other errors to fail the test
    return true;
  });

  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts'); // Visit the Alerts page
  });

  it('should display a normal alert', () => {
    cy.get('#alertButton').click(); // Trigger the alert

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('You clicked a button'); // Validate alert text
    });
  });

  it('should display a timer alert after 5 seconds', () => {
    cy.get('#timerAlertButton').click(); // Trigger the timer alert

    cy.wait(5000); // Wait for the alert to appear

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('This alert appeared after 5 seconds'); // Validate alert text
    });
  });

  it('should handle a confirm alert and click OK', () => {
    cy.get('#confirmButton').click(); // Trigger the confirm alert

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.eq('Do you confirm action?'); // Validate confirm text
      return true; // Simulate clicking 'OK'
    });

    cy.get('#confirmResult').should('have.text', 'You selected Ok'); // Check result message
  });

  it('should handle a confirm alert and click Cancel', () => {
    cy.get('#confirmButton').click(); // Trigger the confirm alert

    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.eq('Do you confirm action?'); // Validate confirm text
      return false; // Simulate clicking 'Cancel'
    });

    cy.get('#confirmResult').should('have.text', 'You selected Cancel'); // Check result message
  });
});
