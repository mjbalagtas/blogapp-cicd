import { times } from 'lodash'

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'mark',
            password: 'mark',
            name: 'MARK BALAGTAS'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        const userTest = {
            username: 'test',
            password: 'delete',
            name: 'delete tester'
        }
        cy.request('POST', 'http://localhost:3003/api/users', userTest)
        cy.visit('http://localhost:3003')
    })

    it('login form is shown', function() {
        cy.contains('Username:')
        cy.contains('Password:')
        cy.contains('Login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mark')
            cy.get('#password').type('mark')
            cy.get('#login-button').click()

            cy.contains('MARK BALAGTAS logged in')
            cy.contains('logout')
            cy.contains('create new blog')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('mark')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain','wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('login').click()
            cy.get('#username').type('mark')
            cy.get('#password').type('mark')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('created blog from cypress')
            cy.get('#author').type('mark@learning fso')
            cy.get('#url').type('localhost:3000')
            cy.get('#create-button').click()

            cy.contains('created blog from cypress mark@learning fso')
            cy.contains('view')
        })

        it('A user can like a blog', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('a user can like')
            cy.get('#author').type('mark@learning fso')
            cy.get('#url').type('localhost:3000')
            cy.get('#create-button').click()

            cy.contains('a user can like mark@learning fso')
            cy.contains('view').click()
            cy.get('.likeDiv').contains('0')
            cy.get('#like-button').click()
            cy.get('.likeDiv').contains('1')
        })

        describe('Delete blog', function() {
            beforeEach(function() {
                cy.contains('create new blog').click()
                cy.get('#title').type('testing delete on cypress')
                cy.get('#author').type('mark@learning fso')
                cy.get('#url').type('localhost:3000')
                cy.get('#create-button').click()
            })

            it('A user can delete his/her own blog', function() {
                cy.contains('testing delete on cypress mark@learning fso')
                cy.contains('view').click()

                cy.get('#delete-button').click()
                cy.contains('testing delete on cypress mark@learning fso').should('not.exist')
            })

            it('A user cannot delete blog of other user', function() {
                cy.contains('MARK BALAGTAS logged in')
                cy.get('#logout-button').click()

                cy.contains('login').click()
                cy.get('#username').type('test')
                cy.get('#password').type('delete')
                cy.get('#login-button').click()

                cy.contains('testing delete on cypress mark@learning fso')
                cy.contains('view').click()

                cy.get('#delete-button').click()
                cy.contains('testing delete on cypress mark@learning fso')
            })
        })

        describe('Blogs arrangement', function() {
            beforeEach(function() {
                cy.contains('create new blog').click()
                cy.get('#title').type('third')
                cy.get('#author').type('high')
                cy.get('#url').type('localhost:3000')
                cy.get('#create-button').click()

                cy.contains('create new blog').click()
                cy.get('#title').type('second')
                cy.get('#author').type('higher')
                cy.get('#url').type('localhost:3000')
                cy.get('#create-button').click()

                cy.contains('create new blog').click()
                cy.get('#title').type('first')
                cy.get('#author').type('highest')
                cy.get('#url').type('localhost:3000')
                cy.get('#create-button').click()
            })

            it('blogs arranged according to their number of likes', function() {
                cy.contains('first highest').contains('view').as('first-button')
                cy.get('@first-button').click().then(() => {
                    times(6, () => {
                        cy.get('#like-button').click()
                    })
                })
                cy.get('@first-button').click()

                cy.contains('second higher').contains('view').as('second-button')
                cy.get('@second-button').click().then(() => {
                    times(4, () => {
                        cy.get('#like-button').click()
                    })
                })
                cy.get('@second-button').click()

                cy.contains('third high').contains('view').as('third-button')
                cy.get('@third-button').click().then(() => {
                    times(2, () => {
                        cy.get('#like-button').click()
                    })
                })
                cy.get('@third-button').click()

                cy.get('#all-blogs > :nth-child(1)').contains('first highest')
                cy.get('#all-blogs > :nth-child(2)').contains('second higher')
                cy.get('#all-blogs > :nth-child(3)').contains('third high')
            })
        })
    })
})