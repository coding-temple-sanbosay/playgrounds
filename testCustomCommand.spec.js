// cypress/integration/testCustomCommand.spec.js

describe('Custom Command Test', () => {
    it('should login using custom command', () => {
      // Replace with your application URL
      cy.visit('https://example.com/login'); 
      
      // Use your custom login command
      cy.login('testuser', 'testpassword');  
      
      // Verify that the URL includes '/dashboard' after login
      cy.url().should('include', '/dashboard');
    });
  });