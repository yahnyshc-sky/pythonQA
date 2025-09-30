

try:
    try:
        t = tuple((1,2,3))
        #Open file with context. Throws error if file exists.
        with open("test.txt", 'xt') as f:
           print(f.read())
        #Does not reach this line as filexistserror thrown
        t[0] = 55
    except FileExistsError as error:
        print("Error" + str(error))
        #In catch exceptions, raises another exception
        raise Exception("File does not exist #2 " + error.filename)
    except Exception as error:
        raise Exception(error)
except Exception as error:
    print("Second try block: " + str(error))