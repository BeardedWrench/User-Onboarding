describe("User Onboarding", () =>{
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    const firstNameInput = () => cy.get('input[name="first_name"]');
    const lastNameInput = () => cy.get('input[name="last_name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');
    const tosInput = () => cy.get('input[name="tos"]');

    const submitBtn = () => cy.get('button[id="submitButton"]');

    it( 'Verify tests are working', () =>{
        expect( 1 + 2 ).to.equal( 3 );
    } )

    it( 'Check typing in the inputs', () => {
        firstNameInput()
            .should( 'have.value', '' )
            .type( 'Terry' )
            .should( 'have.value', 'Terry' )

        lastNameInput()
            .should( 'have.value', '' )
            .type( 'Brown' )
            .should( 'have.value', 'Brown' )

        emailInput()
            .should( 'have.value', '' )
            .type( 'bob@bob.com' )
            .should( 'have.value', 'bob@bob.com' )

        passwordInput()
            .should( 'have.value', '' )
            .type( 'bobert' )
            .should( 'have.value', 'bobert' )

        tosInput()
            .should( 'have.value', 'false' )
            .click()
            .should( 'have.value', 'true' )
    } )
    it( 'Check form validation to see if inputs are empty', () => {
        submitBtn().should( "be.disabled" );
        firstNameInput().type( "Sam" );
        submitBtn().should( "be.disabled" );
        firstNameInput().clear();

        firstNameInput().type( "Sam" );
        lastNameInput().type( "The Hobbit" );
        submitBtn().should( "be.disabled" );

        emailInput().type( "test@test.com" );
        passwordInput().type( "somepassword" )
        tosInput().click();
        submitBtn().should( "not.be.disabled" );

    })

    it( 'Check if we can submit form data', () => {
        cy.contains( 'Terry Brown' ).should('not.exist');
        firstNameInput().type( "Terry" );
        lastNameInput().type( "Brown" );
        emailInput().type( "bob@bob.com" );
        passwordInput().type( "somePass" );
        tosInput().click();
        submitBtn().click();
        cy.contains( 'Terry Brown' );
    } )
})
