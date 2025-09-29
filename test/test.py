
# names_dictionary = { 1: "Maks", 2: "Jibril" }

# def foo(index: int) -> str:
#     return "My name is " + names_dictionary[index]

# for index in names_dictionary:
#     some_var = foo(index) 
#     print(some_var)


class NameLister:
    def __init__(self, names_dictionary: dict):
        self.names_dictionary = names_dictionary

    def __str__(self) -> str:
        result = ""
        for index in self.names_dictionary:
            result += self.my_name_is(index) + "\n"
        return result

    def my_name_is(self, index: int) -> str:
        return "My name is " + self.names_dictionary[index]

names = [ "Maks", "Jibril" ]

names_dictionary = { i+1: names[i] for i in range(len(names)) }

test = NameLister(names_dictionary)
print(test)

