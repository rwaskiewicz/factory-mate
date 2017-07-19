# Contributing

## Found a Bug?
If you find a bug, you can help by [submitting an issue](#submit-issue). 
Even better, you can [submit a Pull Request](#submit-pr) with a fix.

### <a name="submit-issue"></a> Submitting an Issue

When submitting an issue, it'd be super helpful if you can provide the following:
- A Descriptive, Concise Title
- An overview of the issue (two or three sentences describing what you're seeing)
- Steps to reproduce
- A plunk on [http://plnkr.co/](http://plnkr.co/) (or other runnable source code) demonstrating the issue

## Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to this 
repository. 

If you would like to *implement* a new feature, please [submitting a pull request](#submit-pr)

## <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following:

* Make your changes in a new git branch:
    ```shell
    git checkout -b my-fix-branch develop
    ```
* Ensure all linting rules are adhered to:
    ```shell
    npm run lint
    ```
* Ensure that adequate coverage exists for the new feature and all tests pass:
    ```shell
    npm run testSingleRun
    ```
* Commit your changes using a descriptive commit message
* Push your branch to GitHub:
    ```shell
    git push origin my-fix-branch
    ```
* In GitHub, send a pull request to `factory-mate:develop`.
