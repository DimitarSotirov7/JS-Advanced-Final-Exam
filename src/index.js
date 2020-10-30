function solve() {
    const elements = {
        lectureName: document.querySelectorAll('.form-control')
            .item(0)
            .querySelector('input'),
        date: document.querySelectorAll('.form-control')
            .item(1)
            .querySelector('input'),
        module: document.querySelectorAll('.form-control')
            .item(2)
            .querySelector('select'),
        addBtn: document.querySelectorAll('.form-control')
            .item(3)
            .querySelector('button'),
        trainingSection: document.querySelector('.modules'),
    }

    elements.addBtn.addEventListener('click', addLecture);
    elements.trainingSection.addEventListener('click', deleteLecture);

    function deleteLecture(e) {
        
        if (e.target.nodeName !== 'BUTTON') {
            return;
        }

        let btnClicked = e.target;

        let allTrainings = [...e.currentTarget.querySelectorAll('.module')]
        allTrainings.forEach(t => {
            let allLists = [...t.querySelectorAll('li')];
            allLists.forEach(li => {
                let btn = li.querySelector('button');
                if (btn === btnClicked) {
                    if (allLists.length === 1) {
                        t.remove();
                    } else {
                        li.remove();
                    }
                }
            });    
        });
    }

    function addLecture(e) {
        e.preventDefault();

        let lectureName = elements.lectureName.value;
        let date = elements.date.value
            .replace('-', '/')
            .replace('-', '/')
            .replace('T', ' - ');
        let moduleInput = elements.module.value.toUpperCase();

        if (!lectureName || !date || moduleInput === 'Select module') {
            return;
        }

        let matchedModule = false;

        let allTrainings = [...elements.trainingSection.querySelectorAll('.module')]
        allTrainings.forEach(t => {
            let h3 = t.querySelector('h3').textContent;
            if (h3.includes(moduleInput)) {
                matchedModule = true;

                let ul = t.querySelector('ul');

                let li = document.createElement('li');
                li.setAttribute('class', 'flex');
                let h4 = document.createElement('h4');
                h4.textContent = `${lectureName} - ${date}`;
                let btn = document.createElement('button');
                btn.setAttribute('class', 'red');
                btn.textContent = 'Del';
                li.appendChild(h4);
                li.appendChild(btn);
                ul.appendChild(li);

                let lists = sortLectures(ul);
                lists.forEach(li => ul.appendChild(li));
            }
        });

        if (!matchedModule) {
            let lecture = createLecture(lectureName, date, moduleInput);
            elements.trainingSection.appendChild(lecture);
        }
    }

    function sortLectures(ul) {
        let allLists = [...ul.querySelectorAll('li')];

        return allLists.sort((a, b) => {
            let aDate = a.querySelector('h4').textContent.split(' - ')[1];
            let bDate = b.querySelector('h4').textContent.split(' - ')[1];

            return aDate.localeCompare(bDate);
        })
    }

    function createLecture(lectureName, date, moduleInput) {
        let div = document.createElement('div');
        div.setAttribute('class', 'module');
        let h3 = document.createElement('h3');
        h3.textContent = `${moduleInput}-MODULE`;
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        li.setAttribute('class', 'flex');
        let h4 = document.createElement('h4');
        h4.textContent = `${lectureName} - ${date}`;
        let btn = document.createElement('button');
        btn.setAttribute('class', 'red');
        btn.textContent = 'Del';

        li.appendChild(h4);
        li.appendChild(btn);
        ul.appendChild(li);
        div.appendChild(h3);
        div.appendChild(ul);

        return div;
    }
};