import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';

import { AccountService, JhiLanguageHelper, Principal } from '../../shared';
import { NgbTabsetConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: [
        'settings.scss'
    ],
    providers: [NgbTabsetConfig]
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];

    profileUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExMVFRUXFRUYFhYYFRUVFxsXFRUWFxUXFxUYHSggGBslHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy8lICU3Ky0vKzIrLy4tNS0tNy0tLzUyLS0tNS0tLy01LzU1LS0tNi0tLS0tLS01LS0tLS0tMv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIEBQYHAwj/xABGEAABAgMCDAQFAgMGBAcAAAABAAIRITEDYQQSIjJBUXGBscHh8AUGQqEHE3KR8SPRUmKCFDOSorLCFjRT0hckY3ODo+L/xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUBAwYC/8QAMBEAAgIBAQUGBgIDAQAAAAAAAAECAwQRBRIhMUETUWFxobEUIlKR0fAy4ULB8RX/2gAMAwEAAhEDEQA/AO3Ekm7SVBfEwG88tqPiZDef2vUE+lu86uqAlz5wG86uqOfCQme5lQZZLa9zKZshNx7ibkBLnwlU9+yOdATmSozZmbj79EplOr3IICcaAia9yCB0BF0rlAEMp346oBHKdKFBqvN6AlrtJld+6McTOg0fuVAGNM00DmVGd9PHogKmujs49FDrWpiA0VcZBan5k85tsybKwg9wk53oB1CGcdkloviHidtbn9S0c66jRsaJBAdQwvzTgjDD57TrxYv3DFBVja+esFEh8w3hn7kLmVwS4IDpn/HeC0/U3sHIq6svOOCGXzYH+Zrx9zCC5TRKIDteDeIWdoI2doy0P8rg7hRe5dARNe5BcOY8tOMCQ7QQYEbCFsvgvnK2siPnfqsvzwLnad/3CA6YHQEXI12kyu/dWvh2G2duwWzXAt0Xaw4aHXK4AxpmmgcygKmOJmZDR+5Rjoz0ceipzvp49EOVIZuk67hcgKg6JlTXr2JjxMBTSeQUExkJAVPIIT6W7zq6oCS+cBvOrqjn6BM8LyoJhktr3MpmyEye4lAS58JCZ7mVONC8lU5t7j79EaITNT3AID0REQFD3Gg3nV1UGWS2vcype6EhU9xKjNkJuPcTcgGbITce4m5M2Zm4+/RM2Zm4+/RKZTq9yCAUynV7kEAhlO/HVAIZTvx1QCOU6UKDVeb0AAjlOlCg1Xm9AMaZpoHMoBjTNNA5lRnfTx6IBnfTx6LTvPXmMtjg1iYEj9RwqAaMB0Eip1bVs/i2HCysn2hzWNJ+o0a0bTALjlvbOe5znGJcSXG8mJQFFwS4JcEuCAXBKJRKIBRES8oBeUvKXlEBnPKPi5sLduMf0nkNeNE5NfuPtFdVzvp49Fw0iOxdd8t+LDC7EOEi3JtBGeMAKXGqAyhypDN0nXcLlJMZCQFTyCExkJAVPIIT6W7zq6oAT6W7zq6oTDJbXuZQmGS2vcymbITJ7iUAzZCZPcSmbe4+/RM29x9+iZszMnuAQDNmZk9wCNb6nV4XIBDKdXhcL0aI5Ttw1dUB6RRIogKHuhSZPf2UZszNx9+il5AnUlQJZTq9yCAUynV7kEAhlO/HVAIZTvx1QCOU6UKDVeb0AAjlOlCg1Xm9AMaZpoHMoBjTNNA5lRnfTx6IBnfTx6ITjSGbpOu4ITjSGbpOu4KSY5LZAVPIIDUfiRhcLGzsmyxnxOxgp93N+y55cFuvxMOXYNGhtpxYtKuCAXBKJRKIBRES8oBeUvKXlEASuxbL5b8KY9nzLRocCSGgiIgJRhtj9lZ+YPChZ5dmP0yYEajdcoqy63a6uv8As3OiShvmGrsW4fDa2PzbWzBgHMDj/Q6Ev8a09bX8OI/2l4H/AETPVlsUo0nRifS3edXVCYZLa9zKGWS2vcymbITJ7iUAzZCZPcSmbe4+/RM29x9+iZszMnuAQDNmZk9wCAQynV4XBAIZTq8LggHqdLUNXVAAPU6WoauqNnMyGgcygEZmQ0DmUacafp49EB6RRFKA83QEzXuQUAQynfjqpcAMo6KKAI5TpQoNV5vQACOU6UKDVeb0AxpmmgcygGNM00DmVGd9PHogGd9PHohONIZuk67ghONIZuk67gpJjktkBU8ggBMclsgKnkEJ9Ld51dUJ9Ld51dUMslte5lAaF8TAA+wA/htOLJlaXRbp8TGwfYaTi2nFi1Pw/BDaPa0AmJEdmnYsSkorVmUm3ojLYV5cIY11mYuLRFhrGAjinkVhbewdZmD2lp1EQ+2tdDpM17kFS+zBGWAbiIj7Kkq2lOPCa19yfPFi+XA51eUvK3a18DsHTNmG7CWw3AwVt/w1YmcXgaBjDmFMW0qXz1NDxJmpL3wHA3Wzwxo2nQBpJuW0WXluxjE45F7oR+wCyWD4MxoxWNDW6Yad+navFu0oJfIuJ6hiS1+YqsLIBoY3NaANsFGFWItGus/SRAn9r16kxkKaTyCHUPx1VLvPXXqT9Fpoc7t7MscWGrSQdxgto+HH/MPAr8k/62TWO81YNiWocPW2e1sj7QWR+HBhhD4TPyT/AK2VXUU2dpWp95UTjuyaOjZshMnuJTNvcffombe4+/RM2ZmT3ALaeBmzMye4BAIZTq8LhegEMp1eFwQD1OlqGrqgAHqdLUNXVAIzMhoHMoBjTMhoHMqM76ePRAM76ePRSDjGWbx2XJnUzeNwuQOiYCgqeQQHpBEgiAoc2cTop+6gDGmaaBzKlzYmdBo5lU5308eiAZ308eiE40hm6TruCE40hm6TruCkmOS2QFTyCAExyWyAqeQQn0t3nV1Qn0t3nV1QmGS2vcygBMMlte5lWPieF/KAa3PdOPNX2bITce4m5YPxkYtpOZLRvr7KJnWSrpbjzN+PFSnxNQ85hx+W9xLs4RJjMwIFwkfsvDygYOtCf4W8TILYMPwUWlm5rquEjqOiG9YHyowttLUOkQACNRBIIUCF2/iSi+a/JIlXu3JrqbNefwgGk7hq6oBpO4auqARmaaBzKqyYBOZpoHMpnbOPRM7Zx6JnbOKGBnbOKExkKaTyCExkKaTyCHUPx1QyDqH46pSQr3MpSQr3MpSQmT3EoDXPOAgLLXl/7F5+TsZto97SRk4sQYRJIMP8vBenm9v91pJL95yFmPCsDFhZBpzquvcagcNytO23MOKXN6+5D7Pevb6I2TwvDSYh83aDruWRAhlOrwuF6wHhUrUON+6Rks+B6nS1DV1U3AtlZV83R6GjJgoz4AD1OlqGrqgGNMyGgcygGNMyGgcyozvp49FNI4zvp49FOdTN43C5M76eNwuQmMhICp5BACYyEgKnkEB9LdFbuqE+lu86uqkEDJHd5QFcESCIChzY7OPRUk40hm6TruCqeCZaNN9ygmOS2QFTyF6AExyWyAqeQQn0t3nV1Qn0t3nV1QmGS2vcygBMMlte5lM2Qm49xNyZshNx7ibkzb3H36IBm3uPv0WO8YwfJFoZuEjsOgLI5szMnuAUYul321DUtV1Stg4Pqe657klI1Yaz+Fa2WBgWrrWmM0Ai9pr9uCymHYGWHGOac2643q1AjM00DmVzUlOqTi/JlqnGaTQE5mmgcymds49EztnHomds4rWehnbOKExkKaTyCExkKaTyCHUPx1QyDqH46pSQr3MpSQr3MpSQmT3EoYFJCZPcSlLyUpeSlJmvcggLTCcDDrSze6eJjGH8xxcWGyBP2V2JTP4Skz+FcYFgptHRMgK3D91sipWNQXHovc8vSOsmX3gmD1tXS0N5lZQCMzIaBzKps2SEoNFBzKnO+nj0XSUVKqtQKqye/JsZ308einOl6eNwuTOl6eNwuQmMhICp5BbjwCYyEgKnkEJ9Ld51dUJ9Ld51dUJhktrwvKAEwyW14XlSINkJk9xKjNkJk9xKNGLeT79EB6IiICh8TIS1nkFBPpbvOrqpeTQbzq6qCYZLa9zKAEwyW17mUzZCbj3E3JmyE3HuJuTNvcffogGbe4+/RM2ZmT3AJmzMye4BAIZTq8Nl6AAQynV4dUA9TpQoNV5vQD1OlCg1Xm9QBjTNNA5lAU2lkLQZQydXMrAYZghaf5DQ69q2HO+nj0Vr4nZfMsyBRs9sKgboqFm46sg5dUb6LXGWnRmAztnFCYyFNJ5BCYyFNJ5BDqH46rni0B1D8dUpIV7mUpIV7mUpITJ7iUMCkhMnuJSl5KUvJSkzXuQQCkzXuQQSmfwglM/hANJ3DV1Qye+B4KbQxoBU6AOZWfwewAAlBooNd5Vr4PYZGM6QJiBdoJ70q9zvp49F0GDjquCm+bKzItcpadEM76ePRTnfTxuFyZ1M3jcLkJjISGk8gpxHBMZCQFTyCE+lu86uqE+lu86uqEwyW14XlACYZLa8LymbITJ7iUzZCZPcSmbe4+/RAM29x9+iNEJmZPcAmbMzJ7gEa31OrwuCA9ESKICh7tAqfa8qM2Qm49xNyl7oUmT3NRm3uPv0QDNvcffombMzJ7gEzZmZPcAgEMp1eF21AAIZTq8OqAep0tQ1Xm9APU6WoarzeoAxpmmgcygJAxpmmgcyozvp49Ezvp49EOVIZuk67hcgBypDN0nXcLlJMckSAqeQQmMhICp5BCfS3edXVAa94hg/y34raVB1DVtVtSQr3MrL+YX4lkA0Txh7gxisMx4hKZPc1zWZUqrnFeZbUScq1JlVJCZPcSlLyUpeSlJmvcgoxsFJmvcglJn8IJTP4QDSdw1dUAA0ncNXVe2B4ObR4BkKnZrKt3H1OkBRZXy675jXk0xvvACtykYtattUWeLpOMHJGWa3GuaKDX0U5308bhcmdL08bhchMZCQFTyC6YqATGQkBU8ghPpbvOrqhPpbvOrqhMMlteF5QAmGS2vC8pmyEye4lM2QmT3Epm3uPv0QDNvcffombMzJ7gEzZmZPcAgEMp1eFwQACGU6vC4I0ep24auqAep24auqNEZmQ0DmUB6RRIogKHkC8mijNmZk9wClxAma9yCgCGU6vDqgAEMp1eHVAPU6UKDVeb0A9TpQoNV5vUAY0zTQOZQEgY0zTQOZUZ308eiZ308eiHKkM3SddwuQA5Uhm6TruFykmMhICp5BCYyEgKnkEJ9Ld51dUAJ9Ld51dUJhktr3MrE+N+Y8GwMQtLQY38Ayn7cUc4BYzyn5s/tlrasZZ4rWtaWxMXuJJBLoSAlQR2rYqZuLnpwNTugpqGvF9DMeP2X6DgJuBDveBJ3ErVGPLJip9+i3i3sgWOaZl4I+4huC0ZzcWONnUO3UFzm1oaWRn3r2/wCl1gS1g4l3Z4UBN1buAXq21bUkfssdSZUjWVWb7JjrRkPmtqSLhGnVeTsJBno0aN5VoJzNNA5lRXZxRzYVaK7S0LzE01LZfLdlGyjoLidsICAukVq9dnFbtgNji2bbMSg0Bxv0gb4qx2VDetcu5e5Fz5aVqK6lwTGQkBU8ghPpbvOrqta84+aDgLrENYHsf8wPnBwxcSGKaRyjI3UV34J5pwbCQG2L4PPofkvG4524ldL2M9zf04FH29e+4a8e4zRMMlteF5TNkJk9xKZshMnuJTNvcffotZtGbe4+/RM2ZmT3AJmzMye4BAIZTq8LggAEMp1eFwQD1O3DV1QD1O3DV1QCMzICg5lAAIzMhoHMo3Kn6dF9+xRnfTxvNykHGpm8eiA9IoilAeboDKKgD1OlCg1Xm9S5uk6KfuqQMaZpoHMoABjTNNA5lM76ePRM76ePRW+H4fZ2bS+0e2zsxVxMInUNe5ZSb4Iw2ktWXBONIZuk67hcotLQQMw1oznUAG1aB478S2iLMFs8bR8x8Wt/pYJnfDYtE8V8bwjCT+raucNDaMGxglvqptWBZLjLh7kC7aNUOEeL9PudS8b8/YJYDEsibZw0WcMUbbQy+0VonjHnvCrYFrHfJZqs442+0rHZBauisKsOqvpq/ErLs62zrou5EkzjUmp0m8lbx8JbaGE2oqTYxG57f+5aMtu+F9viYdP1WVo3/S7/AGr3lLWmR4xHpfHzOv5szMnuAWqeP4IWWheaPmLjpG3TvW1gQynV4XBeOFYK21afmU0XX7VymZj9vXurn0Otx7uynr0NIA0n8IJzNNA5lXuHeFWlnMiLNBA93DQrGuziuXsrlW92S0ZeQnGa1i9RXZxSuzildnFXmA+HWlsYNEG6XmmwazsSEJTe7FasSkorWTK/BsF+bagDNbNx2UA2nmtvJ9Ld51dVbYFgjbJvy7P+p16uSYZLa8LyumwsbsK9HzfMpMm7tZ6rkc2+L7gHYMwaBan7mzr9lzxbv8WX/wDmbJmqxidrnu/7Vo66vEWlMTks563y/ehsngnnbC8Glj/Nb/DaRcdz84fci5b14L8QsFtf72NjaH+KbNgeKDaAuQoluJVZ00fgZqzba+uq8T6KsbRpAtMYOBoQQRC4iqrA9Ttw1dV8/wDhfi1vg7saxtHM0wBi07WmR3hbz4L8SokDC7OX8dnxdZnkdyrrcCyPGPH3LOnaVc+EuD9Do4EZmQ0DmVGd9PHbcrXw3xGywpuPZWjXsGozj/MKt2FXed9PHooTTT0ZYJprVEZ308eikOiYCgqeQQmMhIaTyCkH0t0Vu6rBkrgiQRAUObExNBo5lU5308eiqc2Naceipc6NzRU7OSAxPmbx6zwWxNo6ehjAYF7tQ1NGkrjHjPi9thVp8y1dE+kCTWj+FjdA99avfOHjhwzCHPB/Tbk2Q0Yo0w1ur9hoWEV7iYyrjq+b/dDnc3Kdst1fxX7qQiIpZCCIiALO+R8I+Xh+DuP8Zb/ja5vEhYJXHh2EfKtbO0/gtGP/AMLg7kvNkd6LR7rluzUu5o+hQPU7cNXVa75q82WWCCBy7UiLLIGGx1ofSPcqfOXmMYJY40jaPiLJhpfaOuERLTELjGE4Q60e573FznGLnGpKp8TE7T5pcvcu83N7L5Ic/YyvjPmnCsKJ+ZakN/6bCWM+wMTvJVpZeMW7RAWroXwdxirBFaSx6pR3ZRTXikU6yLoy3lJp+bMha+NYQ4QNq6F0G/6QvbwnzHhWDH9K2cBpa44zD/SabRArEokMemC0jBJeCSEsi6T3pTbfi2dl8p+crPCwLIgWdv8Awk5LoVcwmuvFrthFbRmyEye4lfOlm8tIc0kOBBBBgQRMEHQV2LyJ5oGFWRa//mGQxtGOKB41ajqO0Kty8Ts/nhy9i3ws3tPknz9zQviRbY2H2grits2x/oDj/qWsLJeZcI+ZheEPM42z4bGuLW+wCxqtKY7tcV4Ip75b1kn4sIiLYagiIgLvw3xG1sLQWlk8tcNVCNLXDSLl2byr5jZh1lFuQ9sBas1HQW/ymc9y4esl5d8Yfglu21aTCjwPUw5w26ReAouVjq2Oq5kzDynTLR/xf7qd6J9LZazq6qQYZI/G1edjbNc1psyCHAODtEHCIO9egg2QmT3EqhOjK4IiICh4Jlo033LV/iL4r8nA3tYYG0IsgbnAl8P6QRvC2h8TISGk8guXfFvDI21jYijLMvOqL3Q+8Gf5lIxIb9qT8yLmWblMmvL7mhIiLoDmgiIgCIiAIiIC/wDGfFbTCbQWloZhjWAaAGiEtpidpKsERYSSWiMyk5PV8wiIsmAiIgCvfB/En4NbMtrM5TTTQQZFpuIVkiw0mtGZUmnqiXGMzUqERZMBERAEREAREQHXPhf4p8zBTZVfZOgPodlNJ2ZQ3Bbk0Yt5Pv0XI/hZh3y8LdZ/9WzcANbmZQ9sddbaITMye4BUOZDctfjxOjwbN+leHA9ERFFJhQ8mg3nV1XFfiHaxw+2GhuI0brNpPuSu1PdoFeF5XEPPOC2jMMtnPY4BzyWuIIDhAQIdQqfs7TtH5FbtPXsl5/kwCIiuSiCIiAIiIAiIgCIiAKVCIAiIgCIiAIiIApUIgCIiAIiIDM+Tbf5eHYO7/wBQN/xgs/3LujWwm6vC4Lg3lnB7R+E2JYxzsW1s3OxWkwAeCSSKSC7y0ep24auqqNo6b68i72Xr2cvM9IokUVcWhQ90JCp7iV52tk3FLXAPxqggEHcdC9XSvJVLWwmZnuQQGseJ+Q8CtATiGycdNkcUbAwxb7LW8P8Ahg8CNlhDT/K9pbuxmxj9l0trfU6vDYjWxynbhq6qRDKthykRrMOmfOP24HFsL8jYdZz+TjjWx7T7Eh3ssPhPhVvZ/wB5YWrPqs3gfchfQIbExNNA5lCMb6ePRSY7RmuaRFlsut/xk0fOUUX0NhOAWdrJ9mxzdOMxpjdMUWOwjypgT5f2WyA0lrQzcMWC2raUesTRLZUukkcKRdntvIOAmTbEt1kWtpL7uKtLf4bYGZNNsD9YIH3aVsW0Kn3mp7MuXd9/6ORouqWvwwwf021tG/5Z++SvG0+F1mKYRaR+hv7r38dT3+h4/wDOv7vU5ii6U74WgD/mjH/2h7ZSo/8ACw1/tX/0x/3rPxtH1ejMPAyPp9V+TnCLozfhYanCof8Aw/8A7Vdn8LRU4SYaP0h75SfG0fV6MfAZH0+q/JzZF06z+F1ma4Q+H0NEfdetn8MLCM7a2h/QI/5SsfHU9/oZWzr+71OWKV1qz+GuCRhjWxGkl7Ruk1XbfIGAiXynHWTa2nJwmvD2hV4ntbMu8Pv/AEcZSK7pZ+UsCZJuC2RvcMeG3GjFZDB/DrGyELOys2m5jW75BeHtKPSLNsdlT6yRwXBvDra0/u7G0f8ASxzuAWXwXyThz4foFsdL3Mb7RxvZdtAxRrJ73BQGwmZk9wC0y2jP/FI3R2XBfyk2cxwT4Y2kjbW7G/y2bS8m4F2LwWyeG+QMCsRjWjXWrv53RGwMbAHfFbU1sMo14XBGt9Ttw1dVHnl2y5slQwqYco/fieWDYOyzbJrWNFGtAa0bhpXq0RmZDQOZQNiYmmgcypAJN3G8qMSiuKJFEAREQAoURACilEBAQIiABAiIAiIgCFEQAoURACilEBAQIiABERAEREAKFEQAoURAQiIgP//Z';
    coverUrl = 'https://s-media-cache-ak0.pinimg.com/originals/ea/9a/8d/ea9a8d5f0df445353c8bfdc0399544a9.jpg';

    constructor(
        private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private config: NgbTabsetConfig
    ) {
        this.languageService.setLocations(['settings']);
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount(account) {
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            authorities: account.authorities
        };
    }
}
