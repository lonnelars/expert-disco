# Fixing chinwag

## First bug: Comments heading is showing when there are no comments

Not a huge issue, but our goal is to represent as much as possible in types.

Current (implicit) model:

    { heading: string
    , comments: UserComment[]
    }

This allows the following state, which should be impossible

    { heading = "Comments"
    , comments = []
    }

Two possibilities: no comments, or at least one comment. Can be expressed as a union type:

    type Model = NoComments | CommentList String (List UserComment)

If there are no comments, there is nothing to do. If there are some comments, there is a heading (String) and a list of comments.

With this type signature, the compiler will lead you to the correct implementation. The `strict` setting makes sure that you handle all cases. NoComments has no data, so there is nothing to do. CommentList has both a heading and a list of comments, which should be displayed to the user.

Implement the types as classes or interfaces. Both work, interfaces might be better because classes belong to OOP.

## Second problem: it is still a valid model to have a heading with no comments

This is a valid model:

    { heading = "Comments"
    , comments = []
    }

Use Feldman's solution from "making impossible states impossible": replace the comments list with two properties:

    { heading: string
    , first: UserComment
    , others: UserComment[]
    }

This way, it is no longer possible to to construct the Comment type without at least one comment.

## XSS bug

We want to be able to use some html tags in the comments, but in doing so, we have introduced an xss vulnerability. How can we design the types to prevent this?

Our comments are strings, which means they allow anything. Our goal is to design a better datatype, such that the compiler guides us towards the correct solution.

Create two new types: RawInput and Sanitized. They are both interfaces, and both contain a kind and a value. The kind property is fixed.

Change the UserComment type to

    { user: string
    , comment: Sanitized
    }

This will guide us towards the solution, because the compiler will complain that you can not pass a Sanitized type to innerHTML.

Declare the sanitize function:

    const sanitize: (input: RawInput) => Sanitized;

Now, just follow the compiler errors through your app, and the vulnerability should be fixed. How sanitation is done is up to the user, but one alternative would be to get a sanitizer from npm. 