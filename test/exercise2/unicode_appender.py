class UnicodeAppender:
    def __init__(self, sentence: str):
        self.sentence = sentence

    def __str__(self) -> str:
        result = ""
        for element in [word + "\U0001F31F" for word in self.splitter(self.sentence)]:
            result += element + "\n"

        return result

    def splitter(self, string: str) -> list:
        return string.split()

