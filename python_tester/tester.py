import json
import re
import colorama

class Tester:
    
    def test_all(self, name, contact):
        try:
            assert self.test_name(name)
            print(colorama.Fore.GREEN + f'Test for name: {name} PASSED' + colorama.Fore.WHITE)
        except:
            print(colorama.Fore.RED + f'Test for name: {name} FAILED' + colorama.Fore.WHITE)
        try:
            assert self.test_contact(contact)
            print(colorama.Fore.GREEN + f'Test for contact: {contact} PASSED' + colorama.Fore.WHITE)
        except:
            print(colorama.Fore.RED + f'Test for contact: {contact} FAILED' + colorama.Fore.WHITE)

    def test_name(self, name):
        if(re.match("^[A-Za-z\s]", name) and len(name) >= 3):
            return True
        else:
            return False

    def test_contact(self, contact):
        if re.match('^\d{10}$', str(contact)) or str(contact) == '':
            return True
        return False

if __name__ == "__main__":
    filename = "test.json"
    with open(filename, 'r') as file:
        json_data = json.load(file)
        file.close()

    tester = Tester()  
    for i in range(1, len(json_data)+1):
        print(json_data[f"item{i}"]["name"], json_data[f"item{i}"]["contact"])
        tester.test_all(json_data[f"item{i}"]["name"], json_data[f"item{i}"]["contact"])
        print()


        
